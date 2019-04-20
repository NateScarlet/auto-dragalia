#!/bin/bash
FILENAME="auto-dragalia-${CIRCLE_TAG:-${CIRCLE_SHA1:0:8}}.zip"
BODY="[bot] 自动构建 [${FILENAME}](${CIRCLE_BUILD_URL}/artifacts/0/$(pwd)/artifacts/${FILENAME})"

hub api -X POST "repos/${CIRCLE_PROJECT_USERNAME}/${CIRCLE_PROJECT_REPONAME}/commits/${CIRCLE_SHA1}/comments" -F "body=${BODY}"
