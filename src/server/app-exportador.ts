"use strict";

import { procedures } from "./procedures-exportador";
import * as operativos from "operativos";
import { TablaDatos, tiposTablaDato } from "operativos";
import { Client } from "pg-promise-strict";

export * from "operativos";

export type Constructor<T> = new(...args: any[]) => T;

export function emergeAppExportador<T extends Constructor<operativos.AppOperativosType>>(Base:T){
    
    return class AppExportador extends Base{
        myProcedures: operativos.ProcedureDef[] = procedures;
        myClientFileName: string = 'exportador';
        constructor(...args:any[]){ 
            super(args);
            this.initialize();
        }

        async generateBaseTableDef(client: Client, tablaDatos:TablaDatos){
            let td = await super.generateBaseTableDef(client, tablaDatos);
            //TODO: dejar de preguntar por el postfix agregar un campo "esCalculada, esExterna o origen" a tablaDatos 
            if (tablaDatos.tipo == tiposTablaDato.externa){
                td.allow = {...td.allow, deleteAll: true, import: true}
            }
            return td
        }

        prepareGetTables(){
            super.prepareGetTables();
            this.getTableDefinition={
                ...this.getTableDefinition,
                // origenes,
                // variables
            }
        }
    }
}

export var AppExportador = emergeAppExportador(operativos.emergeAppOperativos(operativos.AppBackend));
export type AppExportadorType = InstanceType<typeof AppExportador>;
