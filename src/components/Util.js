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

// 日時フォーマット
export let Datelong2Format = (lv) => {
    var d = new Date(lv);

    var formatted = `
${d.getFullYear()}/
${(d.getMonth()+1).toString().padStart(2, '0')}/
${d.getDate().toString().padStart(2, '0')}  
${d.getHours().toString().padStart(2, '0')}:
${d.getMinutes().toString().padStart(2, '0')}
    `.replace(/\n|\r/g, '');

    return formatted;
}

export function isObject(o) {
      return (o instanceof Object && !(o instanceof Array)) ? true : false;
};

const isValueInfo = (val) => { return val.match(/^[_].+/) }
 
