#!/usr/bin/env bash
diplomat-tool js js/src/native/ --docs js/docs/
diplomat-tool c c/
diplomat-tool cpp cpp/ --docs cpp/docs/