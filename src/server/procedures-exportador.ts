"use strict";

var procedures = [
    {
        action:'base/exportar',
        parameters:[
            {name:'operativo'  , typeName:'text', references:'operativos'},
            {name:'base'       , typeName:'text', references:'expo_bases'}
        ],
        coreFunction:async function(){
            //var be = context.be as AppExportadorType;
        }
    },   
];

export {procedures};
