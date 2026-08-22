#!/usr/bin/env bash
# Verifies the agent-readiness contract for rushindra.com.
#
# This project has no unit-test framework — every behaviour changed for the
# agent-readiness pass is an HTTP-level contract (status codes, content types,
# Vary headers, minimum body sizes), so it is asserted at that level instead.
#
#   ./scripts/verify-agent-readiness.sh                       # against localhost:3000
#   ./scripts/verify-agent-readiness.sh https://rushindra.com # against production
set -uo pipefail

BASE="${1:-http://127.0.0.1:3000}"
PASS=0
FAIL=0

green() { printf '\033[32m%s\033[0m\n' "$1"; }
red()   { printf '\033[31m%s\033[0m\n' "$1"; }

ok()   { green "  PASS  $1"; PASS=$((PASS+1)); }
bad()  { red   "  FAIL  $1"; red "        expected: $2"; red "        actual:   $3"; FAIL=$((FAIL+1)); }

assert_eq() { # name expected actual
  if [ "$2" = "$3" ]; then ok "$1"; else bad "$1" "$2" "$3"; fi
}

assert_contains() { # name needle haystack
  if printf '%s' "$3" | grep -qi -- "$2"; then ok "$1"; else bad "$1" "contains '$2'" "$3"; fi
}

assert_min() { # name minbytes actual
  if [ "$3" -ge "$2" ] 2>/dev/null; then ok "$1 (${3} bytes)"; else bad "$1" ">= $2 bytes" "$3 bytes"; fi
}

echo "Verifying agent readiness against: $BASE"
echo

echo "1. Agent-friendly 404s"
code=$(curl -s -o /tmp/ar404.html -w '%{http_code}' --max-time 20 "$BASE/this-path-does-not-exist-$$")
assert_eq "nonexistent path returns 404" "404" "$code"
body=$(cat /tmp/ar404.html 2>/dev/null || echo "")
assert_contains "404 body points at sitemap.xml" "sitemap.xml" "$body"
assert_contains "404 body points at llms.txt" "llms.txt" "$body"
echo

echo "2. Markdown content negotiation (acceptmarkdown.com)"
hdr=$(curl -s -D - -o /tmp/ar.md -w '' --max-time 20 -H 'Accept: text/markdown' "$BASE/")
assert_contains "Accept: text/markdown -> content-type text/markdown" "content-type: text/markdown" "$hdr"
assert_contains "markdown response Vary includes Accept" "vary:.*accept" "$hdr"
assert_min "markdown body is substantive" 500 "$(wc -c < /tmp/ar.md | tr -d ' ')"
html_ct=$(curl -s -D - -o /dev/null --max-time 20 -H 'Accept: text/html,*/*' "$BASE/" | grep -i '^content-type:' || echo "")
assert_contains "browser request still gets HTML" "text/html" "$html_ct"
echo

echo "3. Agent instruction / when-to-use"
llms=$(curl -s --max-time 20 "$BASE/llms.txt")
assert_contains "llms.txt has a when-to-use section" "When To Use This Source" "$llms"
assert_contains "llms.txt states what NOT to use it for" "Do \*\*not\*\* use this file for" "$llms"
llm=$(curl -s --max-time 20 "$BASE/llm")
assert_contains "/llm briefing has when-to-use section" "WHEN TO USE THIS SOURCE" "$llm"
echo

echo "4. Trust anchor pages"
for path in about contact privacy; do
  code=$(curl -s -o "/tmp/ar_$path.html" -w '%{http_code}' --max-time 20 "$BASE/$path")
  assert_eq "/$path returns 200" "200" "$code"
  # strip tags so the assertion is about real prose, not markup volume
  text=$(sed -e 's/<[^>]*>//g' "/tmp/ar_$path.html" 2>/dev/null | tr -s ' \n' ' ')
  assert_min "/$path has >=500 chars of text" 500 "$(printf '%s' "$text" | wc -c | tr -d ' ')"
done
sitemap=$(curl -s --max-time 20 "$BASE/sitemap.xml")
for path in about contact privacy; do
  assert_contains "sitemap lists /$path" "/$path" "$sitemap"
done
echo

echo "5. Metadata completeness"
home=$(curl -s --max-time 20 "$BASE/")
assert_contains "canonical link present" 'rel="canonical"' "$home"
assert_contains "html lang present" '<html lang=' "$home"
assert_contains "og:image present" 'og:image' "$home"
assert_contains "og:type present" 'og:type' "$home"
og_code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 30 "$BASE/opengraph-image")
assert_eq "og:image actually resolves" "200" "$og_code"
echo

echo "6. Schema completeness"
assert_contains "JSON-LD has contactPoint" 'contactPoint' "$home"
assert_contains "JSON-LD has PostalAddress" 'PostalAddress' "$home"
echo

echo "────────────────────────────────"
echo "  passed: $PASS   failed: $FAIL"
[ "$FAIL" -eq 0 ] || exit 1
