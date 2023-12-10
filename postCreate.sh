#!/bin/bash

PATH=src/posts/$1.md
echo "---
id: '$1'
title: ''
date: ''
description: ''
author: ''
category: ''
tags: ['']
---

<!-- ここから描き始め -->
" > $PATH
