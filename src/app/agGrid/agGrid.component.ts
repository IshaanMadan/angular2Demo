import { Component, Input, ViewEncapsulation } from '@angular/core';
import { GridOptions } from "ag-grid/main";
import { addDays, addHours, addMinutes, getYear, getISOWeek } from 'date-fns';
import { cloneDeep, forEach } from 'lodash';

@Component({
    selector: 'hero-detail',
    encapsulation: ViewEncapsulation.None,
    styles: [`
            
            ag-grid-angular {
        display: block; }

        ag-grid-ng2 {
        display: block; }

        ag-grid {
        display: block; }

        ag-grid-polymer {
        display: block; }

        ag-grid-aurelia {
        display: block; }

        .ag-rtl {
        direction: rtl; }

        .ag-ltr {
        direction: ltr; }

        .ag-select-agg-func-popup {
        position: absolute; }

        .ag-body-no-select {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none; }

        .ag-root {
        /* set to relative, so absolute popups appear relative to this */
        position: relative;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        /* was getting some 'should be there' scrolls, this sorts it out */
        overflow: hidden; }

        .ag-layout-normal .ag-root {
        height: 100%; }

        .ag-font-style {
        cursor: default;
        /* disable user mouse selection */
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none; }

        .ag-layout-for-print {
        white-space: nowrap;
        display: inline-block; }

        .ag-layout-normal {
        height: 100%; }

        .ag-popup-backdrop {
        position: fixed;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%; }

        .ag-header {
        white-space: nowrap;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        overflow: hidden;
        width: 100%; }

        .ag-layout-normal .ag-header {
        position: absolute;
        top: 0px;
        left: 0px; }

        .ag-pinned-left-header {
        float: left;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        display: inline-block;
        overflow: hidden;
        height: 100%; }

        .ag-pinned-right-header {
        float: right;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        display: inline-block;
        overflow: hidden;
        height: 100%; }

        .ag-header-viewport {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        overflow: hidden;
        height: 100%; }

        .ag-layout-normal .ag-header-row {
        position: absolute; }

        .ag-layout-normal .ag-header-container {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        white-space: nowrap;
        height: 100%; }

        .ag-layout-auto-height .ag-header-row {
        position: absolute; }

        .ag-layout-auto-height .ag-header-container {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        white-space: nowrap;
        height: 100%; }

        .ag-layout-for-print .ag-header-container {
        white-space: nowrap; }

        .ag-header-overlay {
        display: block;
        position: absolute; }

        .ag-header-cell {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        vertical-align: bottom;
        display: inline-block;
        height: 100%;
        position: absolute; }

        .ag-floating-filter {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        position: absolute;
        display: inline-block; }

        .ag-floating-filter-body {
        margin-right: 25px;
        height: 20px; }

        .ag-floating-filter-full-body {
        width: 100%;
        height: 20px; }

        .ag-floating-filter-input {
        width: 100%; }

        .ag-floating-filter-input:-moz-read-only {
        background-color: #eeeeee; }

        .ag-floating-filter-input:read-only {
        background-color: #eeeeee; }

        .ag-floating-filter-menu {
        position: absolute;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none; }

        .ag-dnd-ghost {
        font-size: 14px;
        font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
        position: absolute;
        background: #e5e5e5;
        border: 1px solid black;
        cursor: move;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 3px;
        line-height: 1.4; }

        .ag-dnd-ghost-icon {
        display: inline-block;
        float: left;
        padding: 2px; }

        .ag-dnd-ghost-label {
        display: inline-block; }

        .ag-header-group-cell {
        height: 100%;
        display: inline-block;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        text-overflow: ellipsis;
        overflow: hidden;
        position: absolute; }

        .ag-header-group-cell-label {
        text-overflow: ellipsis;
        overflow: hidden; }

        .ag-header-cell-label {
        text-overflow: ellipsis;
        overflow: hidden; }

        .ag-header-cell-resize {
        height: 100%;
        width: 4px;
        cursor: col-resize; }

        .ag-ltr .ag-header-cell-resize {
        float: right; }

        .ag-ltr .ag-pinned-right-header .ag-header-cell-resize {
        float: left; }

        .ag-rtl .ag-header-cell-resize {
        float: left; }

        .ag-rtl .ag-pinned-left-header .ag-header-cell-resize {
        float: right; }

        .ag-ltr .ag-header-select-all {
        float: left; }

        .ag-rtl .ag-header-select-all {
        float: right; }

        .ag-header-expand-icon {
        padding-left: 4px; }

        .ag-header-cell-menu-button {
        float: right; }

        .ag-overlay-panel {
        display: table;
        width: 100%;
        height: 100%;
        pointer-events: none; }

        .ag-overlay-wrapper {
        display: table-cell;
        vertical-align: middle;
        text-align: center; }

        .ag-bl-overlay {
        pointer-events: none;
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0px;
        left: 0px; }

        .ag-bl-full-height {
        height: 100%;
        overflow: auto;
        position: relative; }

        .ag-bl-west {
        float: left; }

        .ag-bl-full-height-west {
        height: 100%; }

        .ag-bl-east {
        float: right; }

        .ag-bl-full-height-east {
        height: 100%; }

        .ag-bl-full-height-center {
        height: 100%; }

        .ag-bl-normal {
        height: 100%;
        position: relative; }

        .ag-bl-normal-center-row {
        height: 100%;
        overflow: hidden; }

        .ag-bl-normal-west {
        height: 100%;
        float: left; }

        .ag-bl-normal-east {
        height: 100%;
        float: right; }

        .ag-bl-normal-center {
        height: 100%; }

        .ag-bl-dont-fill {
        position: relative; }

        .ag-body {
        width: 100%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box; }

        .ag-layout-normal .ag-body {
        height: 100%;
        position: absolute; }

        .ag-floating-top {
        width: 100%;
        white-space: nowrap;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        overflow: hidden; }

        .ag-layout-normal .ag-floating-top {
        position: absolute;
        left: 0px; }

        .ag-pinned-left-floating-top {
        float: left;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        display: inline-block;
        overflow: hidden;
        position: relative; }

        .ag-layout-normal .ag-pinned-left-floating-top {
        height: 100%; }

        .ag-pinned-right-floating-top {
        float: right;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        display: inline-block;
        overflow: hidden;
        position: relative; }

        .ag-layout-normal .ag-pinned-right-floating-top {
        height: 100%; }

        .ag-floating-top-viewport {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        overflow: hidden; }

        .ag-layout-normal .ag-floating-top-viewport {
        height: 100%; }

        .ag-floating-top-container {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        white-space: nowrap; }

        .ag-floating-bottom {
        width: 100%;
        white-space: nowrap;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        overflow: hidden; }

        .ag-layout-normal .ag-floating-bottom {
        position: absolute;
        left: 0px; }

        .ag-pinned-left-floating-bottom {
        float: left;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        display: inline-block;
        overflow: hidden;
        position: relative; }

        .ag-layout-normal .ag-pinned-left-floating-bottom {
        height: 100%; }

        .ag-pinned-right-floating-bottom {
        float: right;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        display: inline-block;
        overflow: hidden;
        position: relative; }

        .ag-layout-normal .ag-pinned-right-floating-bottom {
        height: 100%; }

        .ag-floating-bottom-viewport {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        overflow: hidden; }

        .ag-layout-normal .ag-floating-bottom-viewport {
        height: 100%; }

        .ag-floating-bottom-container {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        white-space: nowrap; }

        .ag-pinned-left-cols-viewport {
        float: left; }

        .ag-pinned-left-cols-container {
        display: inline-block;
        position: relative; }

        .ag-pinned-right-cols-viewport {
        float: right; }

        .ag-ltr .ag-pinned-right-cols-viewport {
        overflow-x: hidden;
        overflow-y: auto; }

        .ag-ltr .ag-pinned-left-cols-viewport {
        overflow: hidden; }

        .ag-rtl .ag-pinned-right-cols-viewport {
        overflow: hidden; }

        .ag-rtl .ag-pinned-left-cols-viewport {
        overflow-x: hidden;
        overflow-y: auto; }

        .ag-pinned-right-cols-container {
        display: inline-block;
        position: relative; }

        .ag-layout-normal .ag-body-viewport-wrapper {
        height: 100%; }

        .ag-body-viewport {
        overflow-x: auto;
        overflow-y: auto; }

        .ag-layout-normal .ag-body-viewport {
        height: 100%; }

        .ag-full-width-viewport {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        display: inline;
        pointer-events: none;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        overflow: hidden; }

        .ag-full-width-container {
        overflow: hidden;
        position: relative;
        width: 100%; }

        .ag-floating-bottom-full-width-container {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        pointer-events: none;
        overflow: hidden;
        display: inline; }

        .ag-floating-top-full-width-container {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        pointer-events: none;
        overflow: hidden;
        display: inline; }

        .ag-full-width-row {
        pointer-events: all;
        overflow: hidden; }

        .ag-layout-normal .ag-body-container {
        position: relative;
        display: inline-block; }

        .ag-layout-auto-height .ag-body-container {
        position: relative;
        display: inline-block; }

        .ag-row-animation {
        -webkit-transition: top 0.4s, height 0.4s, background-color 0.1s, opacity 0.2s;
        transition: top 0.4s, height 0.4s, background-color 0.1s, opacity 0.2s; }

        .ag-row-no-animation {
        -webkit-transition: background-color 0.1s;
        transition: background-color 0.1s; }

        .ag-row {
        -webkit-box-sizing: border-box;
        box-sizing: border-box; }

        .ag-layout-normal .ag-row {
        white-space: nowrap;
        position: absolute;
        width: 100%; }

        .ag-layout-auto-height .ag-row {
        white-space: nowrap;
        position: relative;
        width: 100%; }

        .ag-layout-for-print .ag-row {
        position: relative; }

        .ag-column-moving .ag-cell {
        -webkit-transition: left 0.2s;
        transition: left 0.2s; }

        .ag-column-moving .ag-header-cell {
        -webkit-transition: left 0.2s;
        transition: left 0.2s; }

        .ag-column-moving .ag-header-group-cell {
        -webkit-transition: left 0.2s, width 0.2s;
        transition: left 0.2s, width 0.2s; }

        .ag-column-drop {
        width: 100%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box; }

        .ag-column-drop-vertical .ag-column-drop-cell {
        display: block; }

        .ag-column-drop-vertical .ag-column-drop-empty-message {
        display: block; }

        .ag-column-drop-vertical .ag-column-drop-cell-button {
        line-height: 16px; }

        .ag-ltr .ag-column-drop-vertical .ag-column-drop-cell-button {
        float: right; }

        .ag-rtl .ag-column-drop-vertical .ag-column-drop-cell-button {
        float: left; }

        .ag-column-drop-horizontal {
        white-space: nowrap; }
        .ag-column-drop-horizontal .ag-column-drop-cell {
            display: inline-block; }
        .ag-column-drop-horizontal .ag-column-drop-empty-message {
            display: inline-block; }

        .ag-cell {
        display: inline-block;
        white-space: nowrap;
        height: 100%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        text-overflow: ellipsis;
        overflow: hidden;
        position: absolute; }

        .ag-value-slide-out {
        opacity: 1.0;
        margin-right: 5px;
        -webkit-transition: opacity 3s, margin-right 3s;
        transition: opacity 3s, margin-right 3s;
        -webkit-transition-timing-function: linear;
        transition-timing-function: linear; }

        .ag-value-slide-out-end {
        opacity: 0.0;
        margin-right: 10px; }

        .ag-opacity-zero {
        opacity: 0.0; }

        .ag-cell-edit-input {
        width: 100%;
        height: 100%; }

        .ag-group-cell-entire-row {
        width: 100%;
        display: inline-block;
        white-space: nowrap;
        height: 100%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        text-overflow: ellipsis;
        overflow: hidden; }

        .ag-footer-cell-entire-row {
        width: 100%;
        display: inline-block;
        white-space: nowrap;
        height: 100%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        text-overflow: ellipsis;
        overflow: hidden; }

        .ag-large .ag-root {
        font-size: 20px; }

        .ag-popup-editor {
        position: absolute;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none; }

        .ag-menu {
        position: absolute;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        max-height: 100%;
        overflow-y: auto; }

        .ag-menu-column-select-wrapper {
        width: 200px;
        height: 300px;
        overflow: auto; }

        .ag-menu-list {
        display: table;
        border-collapse: collapse; }

        .ag-menu-option {
        display: table-row; }

        .ag-menu-option-text {
        display: table-cell; }

        .ag-menu-option-shortcut {
        display: table-cell; }

        .ag-menu-option-icon {
        display: table-cell; }

        .ag-menu-option-popup-pointer {
        display: table-cell; }

        .ag-menu-separator {
        display: table-row; }

        .ag-menu-separator-cell {
        display: table-cell; }

        .ag-virtual-list-viewport {
        overflow-x: auto;
        height: 100%;
        width: 100%; }

        .ag-virtual-list-container {
        position: relative;
        overflow: hidden; }

        .ag-rich-select {
        outline: none;
        cursor: default; }

        .ag-rich-select-row {
        white-space: nowrap; }

        .ag-rich-select-list {
        width: 200px;
        height: 200px; }

        .ag-set-filter-list {
        width: 200px;
        height: 200px; }

        .ag-set-filter-item {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap; }

        .ag-virtual-list-item {
        position: absolute;
        width: 100%; }
        .ag-virtual-list-item span:empty:not(.ag-icon) {
            border-left: 1px solid transparent; }

        .ag-filter-filter {
        width: 100%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box; }

        .ag-floating-filter-body input {
        width: 100%;
        margin: 0;
        height: 19px; }

        .ag-floating-filter-full-body input {
        width: 100%;
        margin: 0;
        height: 19px; }

        .ag-filter-select {
        width: 110px;
        margin: 4px 4px 0px 4px; }

        .ag-list-selection {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: default; }

        .ag-tool-panel {
        width: 200px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: default;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        overflow: auto; }

        .ag-layout-normal .ag-tool-panel {
        height: 100%; }

        .ag-column-select-indent {
        display: inline-block; }

        .ag-column-select-column {
        white-space: nowrap; }

        .ag-ltr .ag-column-select-column {
        margin-left: 16px; }

        .ag-rtl .ag-column-select-column {
        margin-right: 16px; }

        .ag-column-select-column-group {
        white-space: nowrap; }

        .ag-hidden {
        display: none !important; }

        .ag-visibility-hidden {
        visibility: hidden !important; }

        .ag-faded {
        opacity: 0.3; }

        .ag-width-half {
        width: 50%;
        display: inline-block; }

        .ag-shake-left-to-right {
        -webkit-animation-name: ag-shake-left-to-right;
        animation-name: ag-shake-left-to-right;
        -webkit-animation-duration: 0.2s;
        animation-duration: 0.2s;
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
        -webkit-animation-direction: alternate;
        animation-direction: alternate; }

        @-webkit-keyframes ag-shake-left-to-right {
        from {
            padding-left: 6px;
            padding-right: 2px; }
        to {
            padding-left: 2px;
            padding-right: 6px; } }

        @keyframes ag-shake-left-to-right {
        from {
            padding-left: 6px;
            padding-right: 2px; }
        to {
            padding-left: 2px;
            padding-right: 6px; } }

        /* icons are used outside of the grid root (in the ghost) */
        .ag-icon-aggregation {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNOS41IDIuNWgtNmwyIDMuNS0yIDMuNWg2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iIzAwMCIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-arrows {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTYgNmwtMS40MSAxLjQxTDE2LjE3IDlINHYyaDEyLjE3bC0xLjU4IDEuNTlMMTYgMTRsNC00eiIvPjxwYXRoIGQ9Ik00IDZsMS40MSAxLjQxTDMuODMgOUgxNnYySDMuODNsMS41OCAxLjU5TDQgMTRsLTQtNHoiLz48cGF0aCBkPSJNNiAxNmwxLjQxLTEuNDFMOSAxNi4xN1Y0aDJ2MTIuMTdsMS41OS0xLjU4TDE0IDE2bC00IDR6Ii8+PHBhdGggZD0iTTE0IDRsLTEuNDEgMS40MUwxMSAzLjgzVjE2SDlWMy44M0w3LjQxIDUuNDEgNiA0bDQtNHoiLz48L3N2Zz4=) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-asc {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHBhdGggaWQ9ImEiIGQ9Ik01IDNoMnY5SDV6Ii8+PHBhdGggZD0iTTguOTkzIDUuMlYzLjQ5M2gtNnY2SDQuN1Y1LjJoNC4yOTN6IiBpZD0iYiIvPjwvZGVmcz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjx1c2UgZmlsbD0iI0Q4RDhEOCIgeGxpbms6aHJlZj0iI2EiLz48cGF0aCBzdHJva2U9IiMwMDAiIGQ9Ik01LjUgMy41aDF2OGgtMXoiLz48ZyB0cmFuc2Zvcm09InJvdGF0ZSg0NSA1Ljk5MyA2LjQ5MykiPjx1c2UgZmlsbD0iI0Q4RDhEOCIgeGxpbms6aHJlZj0iI2IiLz48cGF0aCBzdHJva2U9IiMwMDAiIGQ9Ik04LjQ5MyA0Ljd2LS43MDdoLTV2NUg0LjJWNC43aDQuMjkzeiIvPjwvZz48L2c+PC9zdmc+) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-checkbox-checked-readonly {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHJlY3QgaWQ9ImEiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgcng9IjEiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48dXNlIGZpbGw9IiNEOEQ4RDgiIHhsaW5rOmhyZWY9IiNhIi8+PHJlY3Qgc3Ryb2tlPSIjMDAwIiB4PSIuNSIgeT0iLjUiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMSIgcng9IjEiLz48cGF0aCBzdHJva2U9IiMwMDAiIGQ9Ik05IDNMNiA4LjVsLTIuNS0yIi8+PC9nPjwvc3ZnPg==) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-checkbox-checked {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHJlY3QgaWQ9ImEiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgcng9IjEiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48dXNlIGZpbGw9IiNGRkYiIHhsaW5rOmhyZWY9IiNhIi8+PHJlY3Qgc3Ryb2tlPSIjMDAwIiB4PSIuNSIgeT0iLjUiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMSIgcng9IjEiLz48cGF0aCBzdHJva2U9IiMwMDAiIGQ9Ik05IDNMNiA4LjVsLTIuNS0yIi8+PC9nPjwvc3ZnPg==) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-checkbox-indeterminate-readonly {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHJlY3QgaWQ9ImEiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgcng9IjEiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48dXNlIGZpbGw9IiNEOEQ4RDgiIHhsaW5rOmhyZWY9IiNhIi8+PHJlY3Qgc3Ryb2tlPSIjMDAwIiB4PSIuNSIgeT0iLjUiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMSIgcng9IjEiLz48cGF0aCBmaWxsPSIjMDAwIiBkPSJNNCA1aDR2Mkg0eiIvPjwvZz48L3N2Zz4=) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-checkbox-indeterminate {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHJlY3QgaWQ9ImEiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgcng9IjEiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48dXNlIGZpbGw9IiNGRkYiIHhsaW5rOmhyZWY9IiNhIi8+PHJlY3Qgc3Ryb2tlPSIjMDAwIiB4PSIuNSIgeT0iLjUiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMSIgcng9IjEiLz48cGF0aCBmaWxsPSIjMDAwIiBkPSJNNCA1aDR2Mkg0eiIvPjwvZz48L3N2Zz4=) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-checkbox-unchecked-readonly {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHJlY3QgaWQ9ImEiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgcng9IjEiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48dXNlIGZpbGw9IiNEOEQ4RDgiIHhsaW5rOmhyZWY9IiNhIi8+PHJlY3Qgc3Ryb2tlPSIjMDAwIiB4PSIuNSIgeT0iLjUiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMSIgcng9IjEiLz48L2c+PC9zdmc+) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-checkbox-unchecked {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHJlY3QgaWQ9ImEiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgcng9IjEiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48dXNlIGZpbGw9IiNGRkYiIHhsaW5rOmhyZWY9IiNhIi8+PHJlY3Qgc3Ryb2tlPSIjMDAwIiB4PSIuNSIgeT0iLjUiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMSIgcng9IjEiLz48L2c+PC9zdmc+) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-column {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMSAxaDR2Mkgxem0wIDNoNHY3SDF6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-columns {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMSAxaDR2Mkgxem02IDBoNHYySDd6TTEgNWg0djJIMXptNiAwaDR2Mkg3ek0xIDloNHYySDF6bTYgMGg0djJIN3oiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-contracted {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxyZWN0IHN0cm9rZS1vcGFjaXR5PSIuNSIgc3Ryb2tlPSIjMDAwIiB4PSIxLjUiIHk9IjEuNSIgd2lkdGg9IjkiIGhlaWdodD0iOSIgcng9IjEiLz48cGF0aCBmaWxsPSIjMDAwIiBkPSJNOSA1djJIM1Y1eiIvPjwvZz48L3N2Zz4=) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-copy {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiMwMDAiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZD0iTTQuNSA0LjVoNXY1aC01eiIvPjxwYXRoIGQ9Ik03LjUgMi41aC01djVoMnYyaDV2LTVoLTJ2LTJ6Ii8+PC9nPjwvc3ZnPg==) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-cut {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiMwMDAiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZD0iTTMgMy4xMmMuNjY3LjA3OCAzIDEuNzQ1IDcgNS0uMzI2LjIwNC0uNjU5LjIwNC0xIDAtLjM0MS0uMjA2LTEuNjc0LTEuMjA2LTQtMyAwIC42NjYtLjY2Ny42NjYtMiAwLTItMS0xLTIuMTIgMC0yeiIvPjxwYXRoIGQ9Ik0zIDguMjY0Yy42NjctLjA4IDMtMS43NDYgNy01LS4zMjYtLjIwNS0uNjU5LS4yMDUtMSAwLS4zNDEuMjA0LTEuNjc0IDEuMjA0LTQgMyAwLS42NjctLjY2Ny0uNjY3LTIgMC0yIDEtMSAyLjExOSAwIDJ6Ii8+PC9nPjwvc3ZnPg==) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-desc {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHBhdGggaWQ9ImEiIGQ9Ik01IDJoMnY5SDV6Ii8+PHBhdGggZD0iTTguOTkzIDYuMVY0LjM5M2gtNnY2SDQuN1Y2LjFoNC4yOTN6IiBpZD0iYiIvPjwvZGVmcz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjx1c2UgZmlsbD0iI0Q4RDhEOCIgeGxpbms6aHJlZj0iI2EiLz48cGF0aCBzdHJva2U9IiMwMDAiIGQ9Ik01LjUgMi41aDF2OGgtMXoiLz48ZyB0cmFuc2Zvcm09InJvdGF0ZSgtMTM1IDUuOTkzIDcuMzkzKSI+PHVzZSBmaWxsPSIjRDhEOEQ4IiB4bGluazpocmVmPSIjYiIvPjxwYXRoIHN0cm9rZT0iIzAwMCIgZD0iTTguNDkzIDUuNnYtLjcwN2gtNXY1SDQuMlY1LjZoNC4yOTN6Ii8+PC9nPjwvZz48L3N2Zz4=) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-expanded {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxyZWN0IHN0cm9rZS1vcGFjaXR5PSIuNSIgc3Ryb2tlPSIjMDAwIiB4PSIxLjUiIHk9IjEuNSIgd2lkdGg9IjkiIGhlaWdodD0iOSIgcng9IjEiLz48cGF0aCBmaWxsPSIjMDAwIiBkPSJNNSAzaDJ2Nkg1eiIvPjxwYXRoIGZpbGw9IiMwMDAiIGQ9Ik05IDV2MkgzVjV6Ii8+PC9nPjwvc3ZnPg==) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-eye-slash {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zLjAwMSAzLjkwOEwzIDRhMyAzIDAgMSAwIDUuOTk5LS4wOTJBNS4yNDggNS4yNDggMCAwIDAgNiAzYy0xLjEgMC0yLjEuMzAzLTIuOTk5LjkwOHoiIGZpbGw9IiMwMDAiLz48cGF0aCBkPSJNNCA0LjVjLjY2Ny0uMzMzIDEuNjY3LS41IDMtLjUiIHN0cm9rZT0iIzk3OTc5NyIvPjxwYXRoIGQ9Ik0xIDZjMS4zMzMtMiAzLTMgNS0zczMuNjY3IDEgNSAzQzkuNjY3IDggOCA5IDYgOVMyLjMzMyA4IDEgNnoiIHN0cm9rZT0iIzAwMCIvPjxwYXRoIGQ9Ik00LjAwNCAyLjgzNWw0Ljk5MiA2LjMzIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiLz48cGF0aCBkPSJNMy4wMDQgMi44MzVsNC45OTIgNi4zMyIgc3Ryb2tlPSIjRkZGIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIi8+PC9nPjwvc3ZnPg==) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-eye {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zLjAwMSAzLjkwOEwzIDRhMyAzIDAgMSAwIDUuOTk5LS4wOTJBNS4yNDggNS4yNDggMCAwIDAgNiAzYy0xLjEgMC0yLjEuMzAzLTIuOTk5LjkwOHoiIGZpbGw9IiMwMDAiLz48cGF0aCBkPSJNNCA0LjVjLjY2Ny0uMzMzIDEuNjY3LS41IDMtLjUiIHN0cm9rZT0iIzk3OTc5NyIvPjxwYXRoIGQ9Ik0xIDZjMS4zMzMtMiAzLTMgNS0zczMuNjY3IDEgNSAzQzkuNjY3IDggOCA5IDYgOVMyLjMzMyA4IDEgNnoiIHN0cm9rZT0iIzAwMCIvPjwvZz48L3N2Zz4=) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-filter {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMSAyaDEwTDcgNnY1TDUgOVY2TDEgMnptNCA0djFoMlY2SDV6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-folder-open {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiMwMDAiIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZD0iTTEuMzMzIDIuNUwuNSAzLjV2Ni4yMTRsMSAuNzg2aDhsMS0xdi01bC0xLTFoLTNsLTEtMXoiLz48cGF0aCBkPSJNMi41IDEwLjVMMiA5bDEtMyAyLjUtLjVoNmwtMSA1eiIvPjwvZz48L3N2Zz4=) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-folder {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiMwMDAiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZD0iTTEuMzMzIDIuNUwuNSAzLjV2Ni4yMTRsMSAuNzg2aDhsMS0xdi01bC0xLTFoLTNsLTEtMXoiLz48cGF0aCBkPSJNNy41IDMuNWwtMiAyaC01Ii8+PC9nPjwvc3ZnPg==) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-group {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIHN0cm9rZT0iIzAwMCIgZD0iTTcuNSAxLjVoM3YyaC0zem0wIDRoM3YyaC0zem0wIDRoM3YyaC0zeiIvPjxwYXRoIGZpbGw9IiMwMDAiIGQ9Ik0yIDNoMXY4SDJ6bTEgM2g0djFIM3ptMi00aDN2MUg1eiIvPjxwYXRoIGZpbGw9IiMwMDAiIGQ9Ik0yIDEwaDV2MUgyeiIvPjxwYXRoIHN0cm9rZT0iIzAwMCIgZD0iTTEuNSAxLjVoM3YyaC0zeiIvPjwvZz48L3N2Zz4=) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-indeterminate {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zLjA1NiA0LjU4MWEzLjAwMSAzLjAwMSAwIDAgMCA1Ljg4OCAwQzguMDU5IDQuMTk0IDcuMDc4IDQgNiA0Yy0xLjA3OCAwLTIuMDYuMTk0LTIuOTQ0LjU4MXoiIGZpbGw9IiMwMDAiLz48cGF0aCBkPSJNNCA1LjVjLjY2Ny0uMzMzIDEuNjY3LS41IDMtLjUiIHN0cm9rZT0iIzk3OTc5NyIvPjxwYXRoIGQ9Ik0xIDZjMS4zMzMtMS4zMzMgMy0yIDUtMnMzLjY2Ny42NjcgNSAyQzkuNjY3IDcuMzMzIDggOCA2IDhzLTMuNjY3LS42NjctNS0yeiIgc3Ryb2tlPSIjMDAwIi8+PC9nPjwvc3ZnPg==) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-left {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHBhdGggaWQ9ImEiIGQ9Ik01LjUgMS41aDJ2OWgtMnoiLz48cGF0aCBkPSJNNy45OTMgNC43VjIuOTkzaC02djZIMy43VjQuN2g0LjI5M3oiIGlkPSJiIi8+PC9kZWZzPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGcgdHJhbnNmb3JtPSJyb3RhdGUoOTAgNi41IDYpIj48dXNlIGZpbGw9IiNEOEQ4RDgiIHhsaW5rOmhyZWY9IiNhIi8+PHBhdGggc3Ryb2tlPSIjMDAwIiBkPSJNNiAyaDF2OEg2eiIvPjwvZz48ZyB0cmFuc2Zvcm09InJvdGF0ZSgtNDUgNC45OTMgNS45OTMpIj48dXNlIGZpbGw9IiNEOEQ4RDgiIHhsaW5rOmhyZWY9IiNiIi8+PHBhdGggc3Ryb2tlPSIjMDAwIiBkPSJNNy40OTMgNC4ydi0uNzA3aC01djVIMy4yVjQuMmg0LjI5M3oiLz48L2c+PC9nPjwvc3ZnPg==) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-loading {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHBhdGggaWQ9ImEiIGQ9Ik01IDFoMnYzSDV6Ii8+PHBhdGggaWQ9ImIiIGQ9Ik01IDhoMnYzSDV6Ii8+PHBhdGggaWQ9ImMiIGQ9Ik0xIDVoM3YySDF6Ii8+PHBhdGggaWQ9ImQiIGQ9Ik04IDVoM3YySDh6Ii8+PHBhdGggaWQ9ImUiIGQ9Ik00IDBoMnYzSDR6Ii8+PHBhdGggaWQ9ImYiIGQ9Ik00IDdoMnYzSDR6Ii8+PHBhdGggaWQ9ImciIGQ9Ik0wIDRoM3YySDB6Ii8+PHBhdGggaWQ9ImgiIGQ9Ik03IDRoM3YySDd6Ii8+PC9kZWZzPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHVzZSBmaWxsPSIjRDhEOEQ4IiB4bGluazpocmVmPSIjYSIvPjxwYXRoIHN0cm9rZT0iIzk3OTc5NyIgZD0iTTUuNSAxLjVoMXYyaC0xeiIvPjx1c2UgZmlsbD0iI0Q4RDhEOCIgeGxpbms6aHJlZj0iI2IiLz48cGF0aCBzdHJva2U9IiM5Nzk3OTciIGQ9Ik01LjUgOC41aDF2MmgtMXoiLz48dXNlIGZpbGw9IiNEOEQ4RDgiIHhsaW5rOmhyZWY9IiNjIi8+PHBhdGggc3Ryb2tlPSIjOTc5Nzk3IiBkPSJNMS41IDUuNWgydjFoLTJ6Ii8+PHVzZSBmaWxsPSIjRDhEOEQ4IiB4bGluazpocmVmPSIjZCIvPjxwYXRoIHN0cm9rZT0iIzk3OTc5NyIgZD0iTTguNSA1LjVoMnYxaC0yeiIvPjxnIG9wYWNpdHk9Ii43MTQiPjxnIHRyYW5zZm9ybT0icm90YXRlKDQ1IDQuMjkzIDYuNzA3KSI+PHVzZSBmaWxsPSIjRDhEOEQ4IiB4bGluazpocmVmPSIjZSIvPjxwYXRoIHN0cm9rZT0iIzk3OTc5NyIgZD0iTTQuNS41aDF2MmgtMXoiLz48L2c+PGcgdHJhbnNmb3JtPSJyb3RhdGUoNDUgNC4yOTMgNi43MDcpIj48dXNlIGZpbGw9IiNEOEQ4RDgiIHhsaW5rOmhyZWY9IiNmIi8+PHBhdGggc3Ryb2tlPSIjOTc5Nzk3IiBkPSJNNC41IDcuNWgxdjJoLTF6Ii8+PC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDQ1IDQuMjkzIDYuNzA3KSI+PHVzZSBmaWxsPSIjRDhEOEQ4IiB4bGluazpocmVmPSIjZyIvPjxwYXRoIHN0cm9rZT0iIzk3OTc5NyIgZD0iTS41IDQuNWgydjFoLTJ6Ii8+PC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDQ1IDQuMjkzIDYuNzA3KSI+PHVzZSBmaWxsPSIjRDhEOEQ4IiB4bGluazpocmVmPSIjaCIvPjxwYXRoIHN0cm9rZT0iIzk3OTc5NyIgZD0iTTcuNSA0LjVoMnYxaC0yeiIvPjwvZz48L2c+PC9nPjwvc3ZnPg==) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-menu {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMSAxaDEwdjJIMXptMCA0aDEwdjJIMXptMCA0aDEwdjJIMXoiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-minus {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMiA1aDh2MkgyeiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-none {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHBhdGggaWQ9ImEiIGQ9Ik01IDNoMnY2SDV6Ii8+PHBhdGggZD0iTTguMTQ2IDguMTgyVjYuNDc1aC01djVoMS43MDhWOC4xODJoMy4yOTJ6IiBpZD0iYiIvPjxwYXRoIGQ9Ik04LjUgMi45MTRWMS4yMDdoLTV2NWgxLjcwN1YyLjkxNEg4LjV6IiBpZD0iYyIvPjwvZGVmcz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjx1c2UgZmlsbD0iI0Q4RDhEOCIgeGxpbms6aHJlZj0iI2EiLz48cGF0aCBzdHJva2U9IiMwMDAiIGQ9Ik01LjUgMy41aDF2NWgtMXoiLz48ZyB0cmFuc2Zvcm09InJvdGF0ZSgtMTM1IDUuNjQ2IDguNDc1KSI+PHVzZSBmaWxsPSIjRDhEOEQ4IiB4bGluazpocmVmPSIjYiIvPjxwYXRoIHN0cm9rZT0iIzAwMCIgZD0iTTcuNjQ2IDcuNjgydi0uNzA3aC00djRoLjcwOFY3LjY4MmgzLjI5MnoiLz48L2c+PGcgdHJhbnNmb3JtPSJyb3RhdGUoNDUgNiAzLjcwNykiPjx1c2UgZmlsbD0iI0Q4RDhEOCIgeGxpbms6aHJlZj0iI2MiLz48cGF0aCBzdHJva2U9IiMwMDAiIGQ9Ik04IDIuNDE0di0uNzA3SDR2NGguNzA3VjIuNDE0SDh6Ii8+PC9nPjwvZz48L3N2Zz4=) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-not-allowed {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiMwMDAiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBjeD0iNiIgY3k9IjYiIHI9IjQiLz48cGF0aCBkPSJNOC41IDMuNUwzLjQwMSA4LjU5OSIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIvPjwvZz48L3N2Zz4=) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-paste {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiMwMDAiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZD0iTTIuNSAyLjVoN3Y3aC03eiIvPjxwYXRoIGQ9Ik02LjUgMS41aC0xdjJoLTF2MWgzdi0xaC0xdi0yeiIvPjwvZz48L3N2Zz4=) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-pin {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMwMDAiIGQ9Ik0zIDJoNnYxSDh2NGwyIDFIN2wtMSAzLTEtM0gybDItMVYzSDN6Ii8+PHBhdGggZmlsbC1vcGFjaXR5PSIuNSIgZmlsbD0iI0ZGRiIgZD0iTTUgM2gxdjRINXoiLz48cGF0aCBmaWxsLW9wYWNpdHk9Ii4yOCIgZmlsbD0iI0ZGRiIgZD0iTTQgM2gxdjNINHoiLz48L2c+PC9zdmc+) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-pivot {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiMwMDAiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHJlY3QgeD0iMS41IiB5PSIxLjUiIHdpZHRoPSI5IiBoZWlnaHQ9IjkiIHJ4PSIxIi8+PHBhdGggZD0iTTEwLjUgMy41aC05bTItMnY5IiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIi8+PHBhdGggZD0iTTcuNSA2LjVsMS0xIDEgMW0tMyAxbC0xIDEgMSAxIi8+PHBhdGggZD0iTTguNSA1LjV2M2gtMyIvPjwvZz48L3N2Zz4=) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-plus {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik01IDJoMnY4SDV6Ii8+PHBhdGggZD0iTTIgNWg4djJIMnoiLz48L2c+PC9zdmc+) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-right {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHBhdGggaWQ9ImEiIGQ9Ik00LjUgMS41aDJ2OWgtMnoiLz48cGF0aCBkPSJNOS45OTMgNC43VjIuOTkzaC02djZINS43VjQuN2g0LjI5M3oiIGlkPSJiIi8+PC9kZWZzPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGcgdHJhbnNmb3JtPSJyb3RhdGUoOTAgNS41IDYpIj48dXNlIGZpbGw9IiNEOEQ4RDgiIHhsaW5rOmhyZWY9IiNhIi8+PHBhdGggc3Ryb2tlPSIjMDAwIiBkPSJNNSAyaDF2OEg1eiIvPjwvZz48ZyB0cmFuc2Zvcm09InNjYWxlKC0xIDEpIHJvdGF0ZSgtNDUgMCAyMi44NzQpIj48dXNlIGZpbGw9IiNEOEQ4RDgiIHhsaW5rOmhyZWY9IiNiIi8+PHBhdGggc3Ryb2tlPSIjMDAwIiBkPSJNOS40OTMgNC4ydi0uNzA3aC01djVINS4yVjQuMmg0LjI5M3oiLz48L2c+PC9nPjwvc3ZnPg==) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-small-left {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMyA2bDQtNHY4eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-small-right {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNSAybDQgNC00IDR6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-small-up {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMiA3bDQtNCA0IDR6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-small-down {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMiA1aDhMNiA5eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-tick {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMS41IDUuNWwzIDMgNi02IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iIzAwMCIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-cross {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMiAxMGw4LThtMCA4TDIgMiIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiLz48L3N2Zz4=) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-tree-open {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMiA1aDhMNiA5eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .ag-icon-tree-closed {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: transparent url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNSAybDQgNC00IDR6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=) center no-repeat;
        background-size: 12px 12px;
        -webkit-filter: "initial";
        filter: "initial"; }

        .loading-filter {
        position: absolute;
        height: 100%;
        top: 34px;
        background-color: #e6e6e6;
        z-index: 1;
        width: 100%;
        padding: 5px; }

        .ag-details-row {
        width: 100%;
        height: 100%; }

        .ag-details-grid {
        width: 100%;
        height: 100%; }

            
    `],
    template: `
    <input type="button" (click)="deleteRow()" value="Delete Row">
        <ag-grid-angular style="width: 100%; height: 800px"
            class="ag-fresh"
            [rowData]="rowData"
            [columnDefs]="columnDefs"
            [gridOptions]="gridOptions"
            (rowClicked)="onRowClicked($event)">
        </ag-grid-angular>
    `
})
export class AGGridComponent {
    rowClicked: any;
    gridOptions: GridOptions;
    columnDefs: any[]
    rowData: any[];
    public middleWeekStartDate: any = new Date().setHours(0, 0, 0, 0);
    phasesData: any = {};


    constructor() {
        this.gridOptions = <GridOptions>{};

        this.columnDefs = this.createShiftColumnDefinitions(null, null);

        this.rowData  = [
            
               {
                  "day": "Sat",
                  "dayOfWeek": "Saturday",
                  "formattedDisplayDate": "02-12-2017",
                  "date": "2017-12-01T18:30:00.000Z",
                  "dummy": false,
                  "currentPhase": "FINAL",
                  "phaseObj": {
                     "id": 21,
                     "name": "FINAL",
                     "description": "FINAL PHASE",
                     "duration": 4,
                     "sequence": 1,
                     "constructionPhaseStartsAtDay": 0,
                     "activityAccess": 0,
                     "organizationId": 5340,
                     "weekCount": 48,
                     "year": 2017
                  },
                  "editable": false,
                  "id": "",
                  "startDate": "",
                  "created": false,
                  "endDate": "",
                  "formattedActivityName": "",
                  "formattedStartDate": "",
                  "formattedEndDate": "",
                  "bId": "",
                  "pId": "",
                  "bonusTimeBank": "",
                  "amount": "",
                  "overStaff": "",
                  "underStaff": "",
                  "probability": "",
                  "accumulatedTimeBank": "",
                  "remarks": ""
               },
               {
                  "day": "Sun",
                  "dayOfWeek": "Sunday",
                  "formattedDisplayDate": "03-12-2017",
                  "date": "2017-12-02T18:30:00.000Z",
                  "dummy": false,
                  "currentPhase": "FINAL",
                  "phaseObj": {
                     "id": 21,
                     "name": "FINAL",
                     "description": "FINAL PHASE",
                     "duration": 4,
                     "sequence": 1,
                     "constructionPhaseStartsAtDay": 0,
                     "activityAccess": 0,
                     "organizationId": 5340,
                     "weekCount": 48,
                     "year": 2017
                  },
                  "editable": false,
                  "id": "",
                  "startDate": "",
                  "created": false,
                  "endDate": "",
                  "formattedActivityName": "",
                  "formattedStartDate": "",
                  "formattedEndDate": "",
                  "bId": "",
                  "pId": "",
                  "bonusTimeBank": "",
                  "amount": "",
                  "overStaff": "",
                  "underStaff": "",
                  "probability": "",
                  "accumulatedTimeBank": "",
                  "remarks": ""
               },
            
               {
                  "day": "Mon",
                  "dayOfWeek": "Monday",
                  "formattedDisplayDate": "04-12-2017",
                  "date": "2017-12-03T18:30:00.000Z",
                  "dummy": false,
                  "currentPhase": "FINAL",
                  "phaseObj": {
                     "id": 21,
                     "name": "FINAL",
                     "description": "FINAL PHASE",
                     "duration": 4,
                     "sequence": 1,
                     "constructionPhaseStartsAtDay": 0,
                     "activityAccess": 0,
                     "organizationId": 5340,
                     "weekCount": 49,
                     "year": 2017
                  },
                  "editable": false,
                  "id": 46,
                  "name": "Administration",
                  "startDate": "2017-12-04T03:20:32.000Z",
                  "endDate": "2017-12-04T08:20:32.000Z",
                  "bId": 0,
                  "pId": 0,
                  "bonusTimeBank": 0,
                  "amount": 0,
                  "overStaff": 0,
                  "underStaff": 0,
                  "probability": 0,
                  "accumulatedTimeBank": 0,
                  "remarks": "",
                  "activityTypeId": 2,
                  "staffId": 5374,
                  "phase": {
                     "name": "REQUEST",
                     "description": "REQUEST PHASE"
                  },
                  "weekCount": 49,
                  "unitId": 5340,
                  "formattedActivityName": "Administration",
                  "created": true
               },
               {
                  "day": "Tue",
                  "dayOfWeek": "Tuesday",
                  "formattedDisplayDate": "05-12-2017",
                  "date": "2017-12-04T18:30:00.000Z",
                  "dummy": false,
                  "currentPhase": "FINAL",
                  "phaseObj": {
                     "id": 21,
                     "name": "FINAL",
                     "description": "FINAL PHASE",
                     "duration": 4,
                     "sequence": 1,
                     "constructionPhaseStartsAtDay": 0,
                     "activityAccess": 0,
                     "organizationId": 5340,
                     "weekCount": 49,
                     "year": 2017
                  },
                  "editable": false,
                  "id": 51,
                  "name": "Morning",
                  "startDate": "2017-12-04T23:30:00.000Z",
                  "endDate": "2017-12-05T05:30:00.000Z",
                  "bId": 0,
                  "pId": 0,
                  "bonusTimeBank": 0,
                  "amount": 0,
                  "overStaff": 0,
                  "underStaff": 0,
                  "probability": 0,
                  "accumulatedTimeBank": 0,
                  "remarks": "",
                  "activityTypeId": 5,
                  "staffId": 5374,
                  "phase": {
                     "name": "REQUEST",
                     "description": "REQUEST PHASE"
                  },
                  "weekCount": 49,
                  "unitId": 5340,
                  "formattedActivityName": "Morning",
                  "created": true,
                  'shiftCount':  3,
               },   {
                  "day": "Tue",
                  "dayOfWeek": "Tuesday",
                  "formattedDisplayDate": "05-12-2017",
                  "date": "2017-12-04T18:30:00.000Z",
                  "dummy": false,
                  "currentPhase": "FINAL",
                  "phaseObj": {
                     "id": 21,
                     "name": "FINAL",
                     "description": "FINAL PHASE",
                     "duration": 4,
                     "sequence": 1,
                     "constructionPhaseStartsAtDay": 0,
                     "activityAccess": 0,
                     "organizationId": 5340,
                     "weekCount": 49,
                     "year": 2017
                  },
                  "editable": false,
                  "id": 5812,
                  "name": "Morning",
                  "startDate": "2017-12-04T23:30:00.000Z",
                  "endDate": "2017-12-05T05:30:00.000Z",
                  "bId": 0,
                  "pId": 0,
                  "bonusTimeBank": 0,
                  "amount": 0,
                  "overStaff": 0,
                  "underStaff": 0,
                  "probability": 0,
                  "accumulatedTimeBank": 0,
                  "remarks": "",
                  "activityTypeId": 5,
                  "staffId": 5374,
                  "phase": {
                     "name": "REQUEST",
                     "description": "REQUEST PHASE"
                  },
                  "weekCount": 49,
                  "unitId": 5340,
                  "formattedActivityName": "Morning",
                  "created": true,
                  'shiftCount':  3,
               },   {
                  "day": "Tue",
                  "dayOfWeek": "Tuesday",
                  "formattedDisplayDate": "05-12-2017",
                  "date": "2017-12-04T18:30:00.000Z",
                  "dummy": false,
                  "currentPhase": "FINAL",
                  "phaseObj": {
                     "id": 21,
                     "name": "FINAL",
                     "description": "FINAL PHASE",
                     "duration": 4,
                     "sequence": 1,
                     "constructionPhaseStartsAtDay": 0,
                     "activityAccess": 0,
                     "organizationId": 5340,
                     "weekCount": 49,
                     "year": 2017
                  },
                  "editable": false,
                  "id": 54785,
                  "name": "Morning",
                  "startDate": "2017-12-04T23:30:00.000Z",
                  "endDate": "2017-12-05T05:30:00.000Z",
                  "bId": 0,
                  "pId": 0,
                  "bonusTimeBank": 0,
                  "amount": 0,
                  "overStaff": 0,
                  "underStaff": 0,
                  "probability": 0,
                  "accumulatedTimeBank": 0,
                  "remarks": "",
                  "activityTypeId": 5,
                  "staffId": 5374,
                  "phase": {
                     "name": "REQUEST",
                     "description": "REQUEST PHASE"
                  },
                  "weekCount": 49,
                  "unitId": 5340,
                  "formattedActivityName": "Morning",
                  "created": true,
                  'shiftCount':  3,
               },
               {
                  "day": "Wed",
                  "dayOfWeek": "Wednesday",
                  "formattedDisplayDate": "06-12-2017",
                  "date": "2017-12-05T18:30:00.000Z",
                  "dummy": false,
                  "currentPhase": "FINAL",
                  "phaseObj": {
                     "id": 21,
                     "name": "FINAL",
                     "description": "FINAL PHASE",
                     "duration": 4,
                     "sequence": 1,
                     "constructionPhaseStartsAtDay": 0,
                     "activityAccess": 0,
                     "organizationId": 5340,
                     "weekCount": 49,
                     "year": 2017
                  },
                  "editable": false,
                  "id": 53,
                  "name": "Break",
                  "startDate": "2017-12-06T13:30:00.000Z",
                  "endDate": "2017-12-06T16:30:00.000Z",
                  "bId": 0,
                  "pId": 0,
                  "bonusTimeBank": 0,
                  "amount": 0,
                  "overStaff": 0,
                  "underStaff": 0,
                  "probability": 0,
                  "accumulatedTimeBank": 0,
                  "remarks": "",
                  "activityTypeId": 1,
                  "staffId": 5374,
                  "phase": {
                     "name": "REQUEST",
                     "description": "REQUEST PHASE"
                  },
                  "weekCount": 49,
                  "unitId": 5340,
                  "formattedActivityName": "Break",
                  "created": true
               },
               {
                  "day": "Thu",
                  "dayOfWeek": "Thursday",
                  "formattedDisplayDate": "07-12-2017",
                  "date": "2017-12-06T18:30:00.000Z",
                  "dummy": false,
                  "currentPhase": "FINAL",
                  "phaseObj": {
                     "id": 21,
                     "name": "FINAL",
                     "description": "FINAL PHASE",
                     "duration": 4,
                     "sequence": 1,
                     "constructionPhaseStartsAtDay": 0,
                     "activityAccess": 0,
                     "organizationId": 5340,
                     "weekCount": 49,
                     "year": 2017
                  },
                  "editable": false,
                  "id": 56,
                  "name": "Veto Day",
                  "startDate": "2017-12-06T19:25:00.000Z",
                  "endDate": "2017-12-07T18:25:00.000Z",
                  "bId": 0,
                  "pId": 0,
                  "bonusTimeBank": 0,
                  "amount": 0,
                  "overStaff": 0,
                  "underStaff": 0,
                  "probability": 0,
                  "accumulatedTimeBank": 0,
                  "remarks": "",
                  "activityTypeId": 3,
                  "staffId": 5374,
                  "phase": {
                     "name": "REQUEST",
                     "description": "REQUEST PHASE"
                  },
                  "weekCount": 49,
                  "unitId": 5340,
                  "formattedActivityName": "Veto Day",
                  "created": true
               },
               {
                  "day": "Fri",
                  "dayOfWeek": "Friday",
                  "formattedDisplayDate": "08-12-2017",
                  "date": "2017-12-07T18:30:00.000Z",
                  "dummy": false,
                  "currentPhase": "FINAL",
                  "phaseObj": {
                     "id": 21,
                     "name": "FINAL",
                     "description": "FINAL PHASE",
                     "duration": 4,
                     "sequence": 1,
                     "constructionPhaseStartsAtDay": 0,
                     "activityAccess": 0,
                     "organizationId": 5340,
                     "weekCount": 49,
                     "year": 2017
                  },
                  "editable": false,
                  "id": 82,
                  "name": "Administration",
                  "startDate": "2017-12-08T06:30:00.000Z",
                  "endDate": "2017-12-08T11:30:00.000Z",
                  "bId": 0,
                  "pId": 0,
                  "bonusTimeBank": 0,
                  "amount": 0,
                  "overStaff": 0,
                  "underStaff": 0,
                  "probability": 0,
                  "accumulatedTimeBank": 0,
                  "remarks": "",
                  "activityTypeId": 2,
                  "staffId": 5374,
                  "phase": {
                     "name": "REQUEST",
                     "description": "REQUEST PHASE"
                  },
                  "weekCount": 49,
                  "unitId": 5340,
                  "formattedActivityName": "Administration",
                  "created": true
               },
               {
                  "day": "Sat",
                  "dayOfWeek": "Saturday",
                  "formattedDisplayDate": "09-12-2017",
                  "date": "2017-12-08T18:30:00.000Z",
                  "dummy": false,
                  "currentPhase": "FINAL",
                  "phaseObj": {
                     "id": 21,
                     "name": "FINAL",
                     "description": "FINAL PHASE",
                     "duration": 4,
                     "sequence": 1,
                     "constructionPhaseStartsAtDay": 0,
                     "activityAccess": 0,
                     "organizationId": 5340,
                     "weekCount": 49,
                     "year": 2017
                  },
                  "editable": false,
                  "id": 57,
                  "name": "Veto Day",
                  "startDate": "2017-12-08T18:30:00.000Z",
                  "endDate": "2017-12-09T18:30:00.000Z",
                  "bId": 0,
                  "pId": 0,
                  "bonusTimeBank": 0,
                  "amount": 0,
                  "overStaff": 0,
                  "underStaff": 0,
                  "probability": 0,
                  "accumulatedTimeBank": 0,
                  "remarks": "",
                  "activityTypeId": 3,
                  "staffId": 5374,
                  "phase": {
                     "name": "REQUEST",
                     "description": "REQUEST PHASE"
                  },
                  "weekCount": 49,
                  "unitId": 5340,
                  "formattedActivityName": "Veto Day",
                  "created": true
               },
               {
                  "day": "Sun",
                  "dayOfWeek": "Sunday",
                  "formattedDisplayDate": "10-12-2017",
                  "date": "2017-12-09T18:30:00.000Z",
                  "dummy": false,
                  "currentPhase": "FINAL",
                  "phaseObj": {
                     "id": 21,
                     "name": "FINAL",
                     "description": "FINAL PHASE",
                     "duration": 4,
                     "sequence": 1,
                     "constructionPhaseStartsAtDay": 0,
                     "activityAccess": 0,
                     "organizationId": 5340,
                     "weekCount": 49,
                     "year": 2017
                  },
                  "editable": false,
                  "id": 58,
                  "name": "Administration",
                  "startDate": "2017-12-09T19:00:00.000Z",
                  "endDate": "2017-12-10T19:00:00.000Z",
                  "bId": 0,
                  "pId": 0,
                  "bonusTimeBank": 0,
                  "amount": 0,
                  "overStaff": 0,
                  "underStaff": 0,
                  "probability": 0,
                  "accumulatedTimeBank": 0,
                  "remarks": "",
                  "activityTypeId": 2,
                  "staffId": 5374,
                  "phase": {
                     "name": "REQUEST",
                     "description": "REQUEST PHASE"
                  },
                  "weekCount": 49,
                  "unitId": 5340,
                  "formattedActivityName": "Administration",
                  "created": true
               },
            
               {
                  "day": "Mon",
                  "dayOfWeek": "Monday",
                  "formattedDisplayDate": "11-12-2017",
                  "date": "2017-12-10T18:30:00.000Z",
                  "dummy": false,
                  "currentPhase": "FINAL",
                  "phaseObj": {
                     "id": 21,
                     "name": "FINAL",
                     "description": "FINAL PHASE",
                     "duration": 4,
                     "sequence": 1,
                     "constructionPhaseStartsAtDay": 0,
                     "activityAccess": 0,
                     "organizationId": 5340,
                     "weekCount": 50,
                     "year": 2017
                  },
                  "editable": false,
                  "id": 73,
                  "name": "Morning",
                  "startDate": "2017-12-11T05:24:32.000Z",
                  "endDate": "2017-12-11T08:38:11.000Z",
                  "bId": 0,
                  "pId": 0,
                  "bonusTimeBank": 0,
                  "amount": 0,
                  "overStaff": 0,
                  "underStaff": 0,
                  "probability": 0,
                  "accumulatedTimeBank": 0,
                  "remarks": "",
                  "activityTypeId": 5,
                  "staffId": 5374,
                  "phase": {
                     "name": "REQUEST",
                     "description": "REQUEST PHASE"
                  },
                  "weekCount": 50,
                  "unitId": 5340,
                  "formattedActivityName": "Morning",
                  "created": true
               },
               {
                  "day": "Tue",
                  "dayOfWeek": "Tuesday",
                  "formattedDisplayDate": "12-12-2017",
                  "date": "2017-12-11T18:30:00.000Z",
                  "dummy": false,
                  "currentPhase": "FINAL",
                  "phaseObj": {
                     "id": 21,
                     "name": "FINAL",
                     "description": "FINAL PHASE",
                     "duration": 4,
                     "sequence": 1,
                     "constructionPhaseStartsAtDay": 0,
                     "activityAccess": 0,
                     "organizationId": 5340,
                     "weekCount": 50,
                     "year": 2017
                  },
                  "editable": false,
                  "id": 59,
                  "name": "Break",
                  "startDate": "2017-12-11T22:35:32.000Z",
                  "endDate": "2017-12-12T00:40:32.000Z",
                  "bId": 0,
                  "pId": 0,
                  "bonusTimeBank": 0,
                  "amount": 0,
                  "overStaff": 0,
                  "underStaff": 0,
                  "probability": 0,
                  "accumulatedTimeBank": 0,
                  "remarks": "",
                  "activityTypeId": 1,
                  "staffId": 5374,
                  "phase": {
                     "name": "FINAL",
                     "description": "FINAL PHASE"
                  },
                  "weekCount": 50,
                  "unitId": 5340,
                  "formattedActivityName": "Break",
                  "created": true
               },
               {
                  "day": "Wed",
                  "dayOfWeek": "Wednesday",
                  "formattedDisplayDate": "13-12-2017",
                  "date": "2017-12-12T18:30:00.000Z",
                  "dummy": false,
                  "currentPhase": "FINAL",
                  "phaseObj": {
                     "id": 21,
                     "name": "FINAL",
                     "description": "FINAL PHASE",
                     "duration": 4,
                     "sequence": 1,
                     "constructionPhaseStartsAtDay": 0,
                     "activityAccess": 0,
                     "organizationId": 5340,
                     "weekCount": 50,
                     "year": 2017
                  },
                  "editable": false,
                  "id": 52,
                  "name": "Morning",
                  "startDate": "2017-12-13T00:40:54.000Z",
                  "endDate": "2017-12-13T11:22:31.000Z",
                  "bId": 0,
                  "pId": 0,
                  "bonusTimeBank": 0,
                  "amount": 0,
                  "overStaff": 0,
                  "underStaff": 0,
                  "probability": 0,
                  "accumulatedTimeBank": 0,
                  "remarks": "",
                  "activityTypeId": 5,
                  "staffId": 5374,
                  "phase": {
                     "name": "FINAL",
                     "description": "FINAL PHASE"
                  },
                  "weekCount": 50,
                  "unitId": 5340,
                  "formattedActivityName": "Morning",
                  "created": true
               },
               {
                  "day": "Thu",
                  "dayOfWeek": "Thursday",
                  "formattedDisplayDate": "14-12-2017",
                  "date": "2017-12-13T18:30:00.000Z",
                  "dummy": false,
                  "currentPhase": "FINAL",
                  "phaseObj": {
                     "id": 21,
                     "name": "FINAL",
                     "description": "FINAL PHASE",
                     "duration": 4,
                     "sequence": 1,
                     "constructionPhaseStartsAtDay": 0,
                     "activityAccess": 0,
                     "organizationId": 5340,
                     "weekCount": 50,
                     "year": 2017
                  },
                  "editable": false,
                  "id": "",
                  "startDate": "",
                  "created": false,
                  "endDate": "",
                  "formattedActivityName": "",
                  "formattedStartDate": "",
                  "formattedEndDate": "",
                  "bId": "",
                  "pId": "",
                  "bonusTimeBank": "",
                  "amount": "",
                  "overStaff": "",
                  "underStaff": "",
                  "probability": "",
                  "accumulatedTimeBank": "",
                  "remarks": ""
               },
               {
                  "day": "Fri",
                  "dayOfWeek": "Friday",
                  "formattedDisplayDate": "15-12-2017",
                  "date": "2017-12-14T18:30:00.000Z",
                  "dummy": false,
                  "currentPhase": "FINAL",
                  "phaseObj": {
                     "id": 21,
                     "name": "FINAL",
                     "description": "FINAL PHASE",
                     "duration": 4,
                     "sequence": 1,
                     "constructionPhaseStartsAtDay": 0,
                     "activityAccess": 0,
                     "organizationId": 5340,
                     "weekCount": 50,
                     "year": 2017
                  },
                  "editable": false,
                  "id": 81,
                  "name": "Morning",
                  "startDate": "2017-12-15T16:30:00.000Z",
                  "endDate": "2017-12-15T23:30:00.000Z",
                  "bId": 0,
                  "pId": 0,
                  "bonusTimeBank": 0,
                  "amount": 0,
                  "overStaff": 0,
                  "underStaff": 0,
                  "probability": 0,
                  "accumulatedTimeBank": 0,
                  "remarks": "",
                  "activityTypeId": 5,
                  "staffId": 5374,
                  "phase": {
                     "name": "CONSTRUCTION",
                     "description": "CONSTRUCTION PHASE"
                  },
                  "weekCount": 50,
                  "unitId": 5340,
                  "formattedActivityName": "Morning",
                  "created": true
               },
               {
                  "day": "Sat",
                  "dayOfWeek": "Saturday",
                  "formattedDisplayDate": "16-12-2017",
                  "date": "2017-12-15T18:30:00.000Z",
                  "dummy": false,
                  "currentPhase": "FINAL",
                  "phaseObj": {
                     "id": 21,
                     "name": "FINAL",
                     "description": "FINAL PHASE",
                     "duration": 4,
                     "sequence": 1,
                     "constructionPhaseStartsAtDay": 0,
                     "activityAccess": 0,
                     "organizationId": 5340,
                     "weekCount": 50,
                     "year": 2017
                  },
                  "editable": false,
                  "id": "",
                  "startDate": "",
                  "created": false,
                  "endDate": "",
                  "formattedActivityName": "",
                  "formattedStartDate": "",
                  "formattedEndDate": "",
                  "bId": "",
                  "pId": "",
                  "bonusTimeBank": "",
                  "amount": "",
                  "overStaff": "",
                  "underStaff": "",
                  "probability": "",
                  "accumulatedTimeBank": "",
                  "remarks": ""
               },
               {
                  "day": "Sun",
                  "dayOfWeek": "Sunday",
                  "formattedDisplayDate": "17-12-2017",
                  "date": "2017-12-16T18:30:00.000Z",
                  "dummy": false,
                  "currentPhase": "FINAL",
                  "phaseObj": {
                     "id": 21,
                     "name": "FINAL",
                     "description": "FINAL PHASE",
                     "duration": 4,
                     "sequence": 1,
                     "constructionPhaseStartsAtDay": 0,
                     "activityAccess": 0,
                     "organizationId": 5340,
                     "weekCount": 50,
                     "year": 2017
                  },
                  "editable": false,
                  "id": "",
                  "startDate": "",
                  "created": false,
                  "endDate": "",
                  "formattedActivityName": "",
                  "formattedStartDate": "",
                  "formattedEndDate": "",
                  "bId": "",
                  "pId": "",
                  "bonusTimeBank": "",
                  "amount": "",
                  "overStaff": "",
                  "underStaff": "",
                  "probability": "",
                  "accumulatedTimeBank": "",
                  "remarks": ""
               },
            
               {
                  "day": "Mon",
                  "dayOfWeek": "Monday",
                  "formattedDisplayDate": "18-12-2017",
                  "date": "2017-12-17T18:30:00.000Z",
                  "dummy": false,
                  "currentPhase": "CONSTRUCTION",
                  "phaseObj": {
                     "id": 20,
                     "name": "CONSTRUCTION",
                     "description": "CONSTRUCTION PHASE",
                     "duration": 4,
                     "sequence": 2,
                     "constructionPhaseStartsAtDay": 5,
                     "activityAccess": 1,
                     "organizationId": 5340,
                     "weekCount": 51,
                     "year": 2017
                  },
                  "editable": true,
                  "id": 170,
                  "name": "Break",
                  "startDate": "2017-12-17T20:30:00.000Z",
                  "endDate": "2017-12-17T22:30:00.000Z",
                  "bId": 5,
                  "pId": 0,
                  "bonusTimeBank": 0,
                  "amount": 0,
                  "overStaff": 0,
                  "underStaff": 0,
                  "probability": 0,
                  "accumulatedTimeBank": 0,
                  "remarks": "",
                  "activityTypeId": 1,
                  "staffId": 5374,
                  "phase": {
                     "name": "REQUEST",
                     "description": "REQUEST PHASE"
                  },
                  "weekCount": 51,
                  "unitId": 5340,
                  "formattedActivityName": "Break",
                  "created": true
               },
               {
                  "day": "Tue",
                  "dayOfWeek": "Tuesday",
                  "formattedDisplayDate": "19-12-2017",
                  "date": "2017-12-18T18:30:00.000Z",
                  "dummy": false,
                  "currentPhase": "CONSTRUCTION",
                  "phaseObj": {
                     "id": 20,
                     "name": "CONSTRUCTION",
                     "description": "CONSTRUCTION PHASE",
                     "duration": 4,
                     "sequence": 2,
                     "constructionPhaseStartsAtDay": 5,
                     "activityAccess": 1,
                     "organizationId": 5340,
                     "weekCount": 51,
                     "year": 2017
                  },
                  "editable": true,
                  "id": 181,
                  "name": "Break",
                  "startDate": "2017-12-18T20:30:00.000Z",
                  "endDate": "2017-12-18T22:30:00.000Z",
                  "bId": 5,
                  "pId": 0,
                  "bonusTimeBank": 0,
                  "amount": 0,
                  "overStaff": 0,
                  "underStaff": 0,
                  "probability": 0,
                  "accumulatedTimeBank": 0,
                  "remarks": "",
                  "activityTypeId": 1,
                  "staffId": 5374,
                  "phase": {
                     "name": "REQUEST",
                     "description": "REQUEST PHASE"
                  },
                  "weekCount": 51,
                  "unitId": 5340,
                  "formattedActivityName": "Break",
                  "created": true
               },
               {
                  "day": "Wed",
                  "dayOfWeek": "Wednesday",
                  "formattedDisplayDate": "20-12-2017",
                  "date": "2017-12-19T18:30:00.000Z",
                  "dummy": false,
                  "currentPhase": "CONSTRUCTION",
                  "phaseObj": {
                     "id": 20,
                     "name": "CONSTRUCTION",
                     "description": "CONSTRUCTION PHASE",
                     "duration": 4,
                     "sequence": 2,
                     "constructionPhaseStartsAtDay": 5,
                     "activityAccess": 1,
                     "organizationId": 5340,
                     "weekCount": 51,
                     "year": 2017
                  },
                  "editable": true,
                  "id": 186,
                  "name": "Break",
                  "startDate": "2017-12-19T20:30:00.000Z",
                  "endDate": "2017-12-19T22:30:00.000Z",
                  "bId": 5,
                  "pId": 0,
                  "bonusTimeBank": 0,
                  "amount": 0,
                  "overStaff": 0,
                  "underStaff": 0,
                  "probability": 0,
                  "accumulatedTimeBank": 0,
                  "remarks": "",
                  "activityTypeId": 1,
                  "staffId": 5374,
                  "phase": {
                     "name": "REQUEST",
                     "description": "REQUEST PHASE"
                  },
                  "weekCount": 51,
                  "unitId": 5340,
                  "formattedActivityName": "Break",
                  "created": true
               },
               {
                  "day": "Thu",
                  "dayOfWeek": "Thursday",
                  "formattedDisplayDate": "21-12-2017",
                  "date": "2017-12-20T18:30:00.000Z",
                  "dummy": false,
                  "currentPhase": "CONSTRUCTION",
                  "phaseObj": {
                     "id": 20,
                     "name": "CONSTRUCTION",
                     "description": "CONSTRUCTION PHASE",
                     "duration": 4,
                     "sequence": 2,
                     "constructionPhaseStartsAtDay": 5,
                     "activityAccess": 1,
                     "organizationId": 5340,
                     "weekCount": 51,
                     "year": 2017
                  },
                  "editable": true,
                  "id": 200,
                  "name": "Break",
                  "startDate": "2017-12-20T20:30:00.000Z",
                  "endDate": "2017-12-20T22:30:00.000Z",
                  "bId": 5,
                  "pId": 0,
                  "bonusTimeBank": 0,
                  "amount": 0,
                  "overStaff": 0,
                  "underStaff": 0,
                  "probability": 0,
                  "accumulatedTimeBank": 0,
                  "remarks": "",
                  "activityTypeId": 1,
                  "staffId": 5374,
                  "phase": {
                     "name": "REQUEST",
                     "description": "REQUEST PHASE"
                  },
                  "weekCount": 51,
                  "unitId": 5340,
                  "formattedActivityName": "Break",
                  "created": true
               },
               {
                  "day": "Fri",
                  "dayOfWeek": "Friday",
                  "formattedDisplayDate": "22-12-2017",
                  "date": "2017-12-21T18:30:00.000Z",
                  "dummy": false,
                  "currentPhase": "CONSTRUCTION",
                  "phaseObj": {
                     "id": 20,
                     "name": "CONSTRUCTION",
                     "description": "CONSTRUCTION PHASE",
                     "duration": 4,
                     "sequence": 2,
                     "constructionPhaseStartsAtDay": 5,
                     "activityAccess": 1,
                     "organizationId": 5340,
                     "weekCount": 51,
                     "year": 2017
                  },
                  "editable": true,
                  "id": 182,
                  "name": "Break",
                  "startDate": "2017-12-21T20:30:00.000Z",
                  "endDate": "2017-12-21T22:30:00.000Z",
                  "bId": 5,
                  "pId": 0,
                  "bonusTimeBank": 0,
                  "amount": 0,
                  "overStaff": 0,
                  "underStaff": 0,
                  "probability": 0,
                  "accumulatedTimeBank": 0,
                  "remarks": "",
                  "activityTypeId": 1,
                  "staffId": 5374,
                  "phase": {
                     "name": "REQUEST",
                     "description": "REQUEST PHASE"
                  },
                  "weekCount": 51,
                  "unitId": 5340,
                  "formattedActivityName": "Break",
                  "created": true
               },
               {
                  "day": "Sat",
                  "dayOfWeek": "Saturday",
                  "formattedDisplayDate": "23-12-2017",
                  "date": "2017-12-22T18:30:00.000Z",
                  "dummy": false,
                  "currentPhase": "CONSTRUCTION",
                  "phaseObj": {
                     "id": 20,
                     "name": "CONSTRUCTION",
                     "description": "CONSTRUCTION PHASE",
                     "duration": 4,
                     "sequence": 2,
                     "constructionPhaseStartsAtDay": 5,
                     "activityAccess": 1,
                     "organizationId": 5340,
                     "weekCount": 51,
                     "year": 2017
                  },
                  "editable": true,
                  "id": 183,
                  "name": "Break",
                  "startDate": "2017-12-22T20:30:00.000Z",
                  "endDate": "2017-12-22T22:30:00.000Z",
                  "bId": 5,
                  "pId": 0,
                  "bonusTimeBank": 0,
                  "amount": 0,
                  "overStaff": 0,
                  "underStaff": 0,
                  "probability": 0,
                  "accumulatedTimeBank": 0,
                  "remarks": "",
                  "activityTypeId": 1,
                  "staffId": 5374,
                  "phase": {
                     "name": "REQUEST",
                     "description": "REQUEST PHASE"
                  },
                  "weekCount": 51,
                  "unitId": 5340,
                  "formattedActivityName": "Break",
                  "created": true
               },
               {
                  "day": "Sun",
                  "dayOfWeek": "Sunday",
                  "formattedDisplayDate": "24-12-2017",
                  "date": "2017-12-23T18:30:00.000Z",
                  "dummy": false,
                  "currentPhase": "CONSTRUCTION",
                  "phaseObj": {
                     "id": 20,
                     "name": "CONSTRUCTION",
                     "description": "CONSTRUCTION PHASE",
                     "duration": 4,
                     "sequence": 2,
                     "constructionPhaseStartsAtDay": 5,
                     "activityAccess": 1,
                     "organizationId": 5340,
                     "weekCount": 51,
                     "year": 2017
                  },
                  "editable": true,
                  "id": 245,
                  "name": "Administration",
                  "startDate": "2017-12-24T16:30:00.000Z",
                  "endDate": "2017-12-24T23:30:00.000Z",
                  "bId": 0,
                  "pId": 0,
                  "bonusTimeBank": 0,
                  "amount": 0,
                  "overStaff": 0,
                  "underStaff": 0,
                  "probability": 0,
                  "accumulatedTimeBank": 0,
                  "remarks": "",
                  "activityTypeId": 2,
                  "staffId": 5374,
                  "phase": {
                     "name": "REQUEST",
                     "description": "REQUEST PHASE"
                  },
                  "weekCount": 51,
                  "unitId": 5340,
                  "formattedActivityName": "Administration",
                  "created": true
               },
            
               {
                  "day": "Mon",
                  "dayOfWeek": "Monday",
                  "formattedDisplayDate": "25-12-2017",
                  "date": "2017-12-24T18:30:00.000Z",
                  "dummy": false,
                  "currentPhase": "PUZZLE",
                  "phaseObj": {
                     "id": 20,
                     "name": "PUZZLE",
                     "description": "PUZZLE PHASE",
                     "duration": 4,
                     "sequence": 2,
                     "constructionPhaseStartsAtDay": 5,
                     "activityAccess": 1,
                     "organizationId": 5340,
                     "weekCount": 52,
                     "year": 2017
                  },
                  "editable": true,
                  "id": 201,
                  "name": "Break",
                  "startDate": "2017-12-24T20:30:00.000Z",
                  "endDate": "2017-12-24T22:30:00.000Z",
                  "bId": 5,
                  "pId": 0,
                  "bonusTimeBank": 0,
                  "amount": 0,
                  "overStaff": 0,
                  "underStaff": 0,
                  "probability": 0,
                  "accumulatedTimeBank": 0,
                  "remarks": "",
                  "activityTypeId": 1,
                  "staffId": 5374,
                  "phase": {
                     "name": "REQUEST",
                     "description": "REQUEST PHASE"
                  },
                  "weekCount": 52,
                  "unitId": 5340,
                  "formattedActivityName": "Break",
                  "created": true
               },
            
               {
                  "day": "Wed",
                  "dayOfWeek": "Wednesday",
                  "formattedDisplayDate": "17-01-2018",
                  "date": "2018-01-16T18:30:00.000Z",
                  "dummy": false,
                  "currentPhase": "REQUEST",
                  "phaseObj": {
                     "id": 19,
                     "name": "REQUEST",
                     "description": "REQUEST PHASE",
                     "duration": 4,
                     "sequence": 3,
                     "constructionPhaseStartsAtDay": 0,
                     "activityAccess": 2,
                     "organizationId": 5340,
                     "weekCount": 3,
                     "year": 2018
                  },
                  "editable": true,
                  "id": 204,
                  "name": "Break",
                  "startDate": "2018-01-17T05:30:00.000Z",
                  "endDate": "2018-01-17T11:30:00.000Z",
                  "bId": 0,
                  "pId": 0,
                  "bonusTimeBank": 0,
                  "amount": 0,
                  "overStaff": 0,
                  "underStaff": 0,
                  "probability": 0,
                  "accumulatedTimeBank": 0,
                  "remarks": "00",
                  "activityTypeId": 1,
                  "staffId": 5374,
                  "phase": {
                     "name": "REQUEST",
                     "description": "REQUEST PHASE"
                  },
                  "weekCount": 3,
                  "unitId": 5340,
                  "formattedActivityName": "Break",
                  "created": true
               },
              
               {
                  "day": "Sat",
                  "dayOfWeek": "Saturday",
                  "formattedDisplayDate": "10-02-2018",
                  "date": "2018-02-09T18:30:00.000Z",
                  "dummy": false,
                  "currentPhase": "REQUEST",
                  "phaseObj": {
                     "id": 19,
                     "name": "REQUEST",
                     "description": "REQUEST PHASE",
                     "duration": 4,
                     "sequence": 3,
                     "constructionPhaseStartsAtDay": 0,
                     "activityAccess": 2,
                     "organizationId": 5340,
                     "weekCount": 6,
                     "year": 2018
                  },
                  "editable": true,
                  "id": "",
                  "startDate": "",
                  "created": false,
                  "endDate": "",
                  "formattedActivityName": "",
                  "formattedStartDate": "",
                  "formattedEndDate": "",
                  "bId": "",
                  "pId": "",
                  "bonusTimeBank": "",
                  "amount": "",
                  "overStaff": "",
                  "underStaff": "",
                  "probability": "",
                  "accumulatedTimeBank": "",
                  "remarks": ""
               },
               {
                  "day": "Sun",
                  "dayOfWeek": "Sunday",
                  "formattedDisplayDate": "11-02-2018",
                  "date": "2018-02-10T18:30:00.000Z",
                  "dummy": false,
                  "currentPhase": "REQUEST",
                  "phaseObj": {
                     "id": 19,
                     "name": "REQUEST",
                     "description": "REQUEST PHASE",
                     "duration": 4,
                     "sequence": 3,
                     "constructionPhaseStartsAtDay": 0,
                     "activityAccess": 2,
                     "organizationId": 5340,
                     "weekCount": 6,
                     "year": 2018
                  },
                  "editable": true,
                  "id": "",
                  "startDate": "",
                  "created": false,
                  "endDate": "",
                  "formattedActivityName": "",
                  "formattedStartDate": "",
                  "formattedEndDate": "",
                  "bId": "",
                  "pId": "",
                  "bonusTimeBank": "",
                  "amount": "",
                  "overStaff": "",
                  "underStaff": "",
                  "probability": "",
                  "accumulatedTimeBank": "",
                  "remarks": ""
               }
            ];
        this.gridOptions = {
            columnDefs: this.columnDefs,
            rowData: this.rowData,
            animateRows: true,
            rowSelection: 'single',
            editType: 'fullRow',
        };
        this.gridOptions.getRowHeight = function(params) {
              if (params.node.data && params.node.data.shiftCount) {
                  return 60/params.node.data.shiftCount;
              } else {
                  return 60;
              }
              //return 20;
          }
    }

    createShiftColumnDefinitions(activityTypeNameList, phasesDataObj) {
        let shiftColumnDefs = [
            {
                headerName: "",
                field: "date",
                width: 10,
                minWidth: 10,
                maxWidth: 10,
                suppressMovable: true,
                suppressToolPanel: true,
                cellRenderer: (params) => {
                    let node = params.node;
                    if (node && node.data && node.data.day == "TB | VA") {
                        let html = '<div class="bar"></div>';
                        return html;
                    } else {
                        return null;
                    }
                },
                cellClass: (params) => {
                    let node = params.node;
                    if (node && node.data && node.data.day == "TB | VA") {
                        return "weekBar";
                    } else {
                        return null;
                    }
                }
            },
            {
                headerName: "",
                field: "date",
                width: 45,
                minWidth: 45,
                maxWidth: 45,
                suppressMovable: true,
                suppressToolPanel: true,
                cellRenderer: (params) => {
                    let node = params.node;
                    if (node && node.data && node.data.day == "TB | VA") {
                        let weekDate = node.data.date;
                        let weekNumber = getISOWeek(weekDate);
                        // let phaseName = this.getWeekPhase(weekDate);
                        let phaseObj = this.getCurrentPhaseName(weekDate);
                        let phaseName = (phaseObj) ? phaseObj.name : "";
                        let html = '<div class="week-list"> \
                                    <span>'+ phaseName + ' (Week ' + weekNumber + ')</span> \
                            </div>' ;
                        return html;
                    } else {
                        return null;
                    }
                },
                cellClass: (params) => {
                    let node = params.node;
                    if (node && node.data && node.data.day == "TB | VA") {
                        return "weekName";
                    } else {
                        return null;
                    }
                }
            },
            {
                headerName: "",
                field: "day",
                width: 90,
                minWidth: 90,
                maxWidth: 90,
                cellClass: "day-col",
                suppressMovable: true,
                suppressToolPanel: true,
                cellRenderer: (params) => {
                    // let data = params.data;
                    let rowIndex = params.rowIndex;
                    let value = (params.value) ? params.value : "";
                    let node = params.node;
                    if ((node && node.data && node.data.day == "Sun")) {
                        return `<div class="week-separator"></div><div class="week"><div><span>${value}</span></div></div>`;
                    } else {
                        return `<div class="week"><div><span>${value}</span></div></div>`;
                    }
                }
            },
            {
                headerName: "Activity", field: "formattedActivityName",
                width: 200,
                suppressMovable: true,
                suppressToolPanel: true,
                editable: (params) => {
                    let node = params.node;
                    let isEditable = this.isRowEditable(node.data);
                    if ((node && node.data && node.data.day == "TB | VA") || (!isEditable)) {
                        return false;
                    } else {
                        return true;
                    }
                },
                cellRenderer: (params) => {

                    let node = params.node;
                    let value = (params.value) ? params.value : "";
                    if ((node && node.data && node.data.day == "Sun")) {
                        return `<div class="week-separator"></div><div class="col-text"><span>${value}</span></div>`;
                    } else {
                        return `<div class="col-text"><span>${value}</span></div>`;
                    }
                },

                //cellEditorFramework: SelectEditorComponent,
                // cellEditor: 'select',
                cellEditorParams: {
                    values: activityTypeNameList
                }
            },
            {
                headerName: "Start", field: "startDate",
                width: 125,
                suppressMovable: true,
                suppressToolPanel: true,
                editable: (params) => {
                    //  console.log("params ", params);
                    let node = params.node;
                    let isEditable = this.isRowEditable(node.data);
                    if ((node && node.data && node.data.day == "TB | VA") || (!isEditable)) {
                        return false;
                    } else {
                        return true;
                    }
                },
                cellRenderer: (params) => {
                    // console.log("Start ", params);
                    let newDate = "";
                    let value = params.value;
                    let data = params.node.data;
                    let node = params.node;
                    if (value) {
                        newDate = this.formatMinutesIntoDuration(value, data.date);
                    }
                    // this.checkShiftCreationParameters(params);
                    //  console.log("renderer..........", params.node.data);
                    // return `<div class="col-text"><span>${newDate}</span></div>`;
                    if ((node && node.data && node.data.day == "Sun")) {
                        return `<div class="week-separator"></div><div class="col-text"><span>${newDate}</span></div>`;
                    } else {
                        return `<div class="col-text"><span>${newDate}</span></div>`;
                    }
                },
                //cellRendererFramework: DateRendererComponent,
                //cellEditorFramework: DateEditorComponent,
                cellEditorParams: {
                    values: 'Start Time'
                }
            },
            {
                headerName: "End", field: "endDate",
                width: 125,
                suppressMovable: true,
                suppressToolPanel: true,
                editable: (params) => {
                    let node = params.node;
                    let isEditable = this.isRowEditable(node.data);
                    if ((node && node.data && node.data.day == "TB | VA") || (!isEditable)) {
                        return false;
                    } else {
                        return true;
                    }
                },
                cellRenderer: (params) => {
                    //  console.log("End ", params);
                    let newDate = "";
                    let node = params.node;
                    let value = params.value;
                    let data = params.node.data;
                    if (value) {
                        newDate = this.formatMinutesIntoDuration(value, data.date);
                    }
                    //    this.checkShiftCreationParameters(params);
                    // return `<div class="col-text"><span>${newDate}</span></div>`;
                    if ((node && node.data && node.data.day == "Sun")) {
                        return `<div class="week-separator"></div><div class="col-text"><span>${newDate}</span></div>`;
                    } else {
                        return `<div class="col-text"><span>${newDate}</span></div>`;
                    }
                },
                //cellEditorFramework: DateEditorComponent,
                cellEditorParams: {
                    values: 'End Time'
                }
            },
            {
                headerName: "Bid", field: "bId", editable: (params) => {
                    let node = params.node;
                    let isEditable = this.isRowEditable(node.data);
                    if ((node && node.data && node.data.day == "TB | VA") || (!isEditable)) {
                        return false;
                    } else {
                        return true;
                    }
                },
                width: 70,
                cellRenderer: function (params) {
                    let node = params.node;
                    let value = (params.value || params.value == 0) ? params.value : "";
                    // return `<div class="col-text"><span>${value}</span></div>`;
                    if ((node && node.data && node.data.day == "Sun")) {
                        return `<div class="week-separator"></div><div class="col-text"><span>${value}</span></div>`;
                    } else {
                        return `<div class="col-text"><span>${value}</span></div>`;
                    }
                },
                //cellEditorFramework: NumberCellEditorComponent,
            },
            {
                headerName: "PI Time", field: "pId",
                width: 100,
                cellRenderer: function (params) {
                    let node = params.node;
                    let value = (params.value || params.value == 0) ? params.value : "";
                    // return `<div class="col-text"><span>${value}</span></div>`;
                    if ((node && node.data && node.data.day == "Sun")) {
                        return `<div class="week-separator"></div><div class="col-text"><span>${value}</span></div>`;
                    } else {
                        return `<div class="col-text"><span>${value}</span></div>`;
                    }
                },
            },
            {
                headerName: "Bonus Time Bank", field: "bonusTimeBank",
                width: 190,
                cellRenderer: function (params) {
                    let node = params.node;
                    let value = (params.value || params.value == 0) ? params.value : "";
                    // return `<div class="col-text"><span>${value}</span></div>`;
                    if ((node && node.data && node.data.day == "Sun")) {
                        return `<div class="week-separator"></div><div class="col-text"><span>${value}</span></div>`;
                    } else {
                        return `<div class="col-text"><span>${value}</span></div>`;
                    }
                },
            },
            {
                headerName: "Dollar", field: "amount",
                width: 130,
                cellRenderer: function (params) {
                    let node = params.node;
                    let value = (params.value || params.value == 0) ? params.value : "";
                    // return `<div class="col-text"><span>${value}</span></div>`;
                    if ((node && node.data && node.data.day == "Sun")) {
                        return `<div class="week-separator"></div><div class="col-text"><span>${value}</span></div>`;
                    } else {
                        return `<div class="col-text"><span>${value}</span></div>`;
                    }
                },
            },
            {
                headerName: "OverStaff", field: "overStaff",
                width: 130,
                cellRenderer: function (params) {
                    let node = params.node;
                    let value = (params.value || params.value == 0) ? params.value : "";
                    // return `<div class="col-text"><span>${value}</span></div>`;
                    if ((node && node.data && node.data.day == "Sun")) {
                        return `<div class="week-separator"></div><div class="col-text"><span>${value}</span></div>`;
                    } else {
                        return `<div class="col-text"><span>${value}</span></div>`;
                    }
                },
            },
            {
                headerName: "UnderStaff", field: "underStaff",
                width: 140,
                cellRenderer: function (params) {
                    let node = params.node;
                    let value = (params.value || params.value == 0) ? params.value : "";
                    // return `<div class="col-text"><span>${value}</span></div>`;
                    if ((node && node.data && node.data.day == "Sun")) {
                        return `<div class="week-separator"></div><div class="col-text"><span>${value}</span></div>`;
                    } else {
                        return `<div class="col-text"><span>${value}</span></div>`;
                    }
                },
            },
            {
                headerName: "probability", field: "probability",
                // minWidth: 100,
                cellRenderer: function (params) {
                    let node = params.node;
                    let value = (params.value || params.value == 0) ? params.value : "";
                    // return `<div class="col-text"><span>${value}</span></div>`;
                    if ((node && node.data && node.data.day == "Sun")) {
                        return `<div class="week-separator"></div><div class="col-text"><span>${value}</span></div>`;
                    } else {
                        return `<div class="col-text"><span>${value}</span></div>`;
                    }
                },
            },
            {
                headerName: "Accumulated Time Bank", field: "accumulatedTimeBank",
                width: 240,
                cellRenderer: function (params) {
                    let node = params.node;
                    let value = (params.value || params.value == 0) ? params.value : "";
                    // return `<div class="col-text"><span>${value}</span></div>`;
                    if ((node && node.data && node.data.day == "Sun")) {
                        return `<div class="week-separator"></div><div class="col-text"><span>${value}</span></div>`;
                    } else {
                        return `<div class="col-text"><span>${value}</span></div>`;
                    }
                },
            },
        ]

        return shiftColumnDefs;
    }

    onRowClicked(params) {
        // this.rowClicked = params;
        let rowData = cloneDeep(params.data);
        rowData.date = new Date(rowData.date);
        this.rowClicked = cloneDeep(rowData);
    }

    isRowEditable(rowData) {
        //  currentDate = startOfWeek(new Date(), { weekStartsOn: 1 });
        // let currentDate = this.middleWeekStartDate;
        // let weekEndDate = addDays(currentDate, 6);
        // if (rowData) {
        //     let date = rowData.date;
        //     let editable = rowData.editable;
        //     if (date >= currentDate && date <= weekEndDate && editable) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // } else {
        //     return false;
        // }
        return true;

    }

    formatMinutesIntoDuration(value, date) {
        let pattern = /^([01]\d|2[0-3])([0-5]\d)$/;
        let formattedDuration = '';
        if (value) {
            if (typeof value == "string") {
                if (pattern.test(value.toString())) {
                    value = this.convertIntoDateObj(date, value);
                } else {
                    return formattedDuration;
                }
            }
            let hours = new Date(value).getHours();
            let minutes = new Date(value).getMinutes();
            let hoursFormatted = hours ? ((hours < 10) ? `0${hours}` : hours) : "00";
            let minuteFormatted = minutes ? ((minutes < 10) ? `0${minutes}` : `${minutes}`) : "00";
            formattedDuration = `${hoursFormatted}${minuteFormatted}`;
        }
        return formattedDuration;
    }

    convertIntoDateObj(date, value) {
        let currentRowDate = date;
        let time = value;
        let { hours: startHours, minutes: startMinutes } = this.splitHoursAndMinutes(time);
        currentRowDate = addHours(currentRowDate, startHours);
        currentRowDate = addMinutes(currentRowDate, startMinutes);
        return currentRowDate;
    }

    splitHoursAndMinutes(time) {
        let hours;
        let minutes;
        // time = time.toString();
        if (time && time.length == 4) {
            hours = time.slice(0, 2);
            minutes = time.slice(2);
        }
        return { hours, minutes };
    }

    getCurrentPhaseName(weekDate, phasesData?) {
        // if (!phasesData) {
        //     phasesData = this.phasesData;
        // }
        // let cellYear = getYear(weekDate);
        // let currentOnGoingWeek = getISOWeek(weekDate);
        // let firstPhase;
        // if (phasesData && phasesData.length) {
        //     firstPhase = phasesData[0];
        //     let firstCellYear = firstPhase.year;
        //     let currentWeek = firstPhase.weekCount;
        //     if ((cellYear < firstCellYear) || (cellYear == firstCellYear && currentOnGoingWeek < currentWeek)) {
        //         return firstPhase;
        //     }
        // }
        // let phaseName = "";
        // for (let weekPhase of phasesData) {
        //     if (weekPhase.year == cellYear && weekPhase.weekCount == currentOnGoingWeek) {
        //         phaseName = weekPhase;
        //         break;
        //     }
        // }
        return {name: "PUZZLE"};
    }
    deleteRow(){
        console.log("this.rowClicked", this.rowClicked);
        var selectedData = this.gridOptions.api.getSelectedRows();
        forEach(this.rowData, (obj)=>{
            if(obj.id==5812 || obj.id==51){
                obj.shiftCount = obj.shiftCount-1;
            }
        });
        
        var res = this.gridOptions.api.updateRowData({ remove: selectedData })
        var res1 = this.gridOptions.api.resetRowHeights();
        
        this.printResult(res);
        this.printResult(res1);
    }

    printResult(res) {
        console.log("---------------------------------------");
        if (res.add) {
          res.add.forEach(function(rowNode) {
            console.log("Added Row Node", rowNode);
          });
        }
        if (res.remove) {
          res.remove.forEach(function(rowNode) {
            console.log("Removed Row Node", rowNode);
          });
        }
        if (res.update) {
          res.update.forEach(function(rowNode) {
            console.log("Updated Row Node", rowNode);
          });
        }
      }
}