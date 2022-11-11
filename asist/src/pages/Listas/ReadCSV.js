import React, { memo, useState, useEffect } from "react";

  const readCSV = (str, rowNumber, delim = ",") => {
    
    const headers = str.slice(0, str.indexOf("\n")).split(delim);
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    //ignore empty rows
    const cleanRows = rows.filter(item => item !== "")

    let result = splitCsvRows(rowNumber, headers, cleanRows, delim );

    if(result.isFileCorrect)
    {
      return result.data;
    }
    else
    {
        return null
    }
  }


const splitCsvRows = (numberCol, headers, rows, delim) => {

    let isFileCorrect = false;
    
    const data = rows.map((row) => {
    
      const values = row.split(delim);

      values.length !== numberCol ? isFileCorrect = false : isFileCorrect = true;
        
      const eachObject = headers.reduce((obj, header, i) => {
        const header_str = header.replace(/\s/g, '');
        obj[header_str] = values[i];
          return obj;
        }, {});
      return eachObject;
    });
   
    return ({
      data : data,
      isFileCorrect : isFileCorrect
    })
}

export default {
    readCSV
}