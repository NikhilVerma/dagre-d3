#!/bin/bash

HERE=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

cd "$HERE/.."

python3 -m http.server 8080
