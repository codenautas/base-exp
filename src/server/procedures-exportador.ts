"use strict";

import {ProcedureContext} from "operativos";
import { AppExportadorType } from "./app-exportador";

type TablaDatosGenerarParameters={
    operativo: string
    tabla_datos: string
}

var procedures = [
    {
        action:'tabla_datos/generar',
        parameters:[
            {name:'operativo'  , typeName:'text', references:'operativos' },
            {name:'tabla_datos', typeName:'text', references:'tabla_datos'}
        ],
        coreFunction:async function(context:ProcedureContext, parameters:TablaDatosGenerarParameters){
            var be = context.be as AppExportadorType;
        }
    },   
];

export {procedures};
