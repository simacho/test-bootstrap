import React, { Component } from 'react';
import { useState , useEffect } from "react";

// 改行メッセージに変換する
export function NewLineToBr({children = ""}){
    return children.split('\n').reduce(function (arr,line) {
        return arr.concat(
            line,
            <br />
        );
    },[]);
}



