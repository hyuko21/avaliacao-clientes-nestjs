#!/bin/bash

type=$1

find "$(dirname "$0")" -name "run-${type}*.ts" | while read -r line; do
  yarn run-ts "${line}"
done