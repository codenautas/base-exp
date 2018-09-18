"use strict";
import {TableContext,TableDefinition} from "operativos"

function expo_tablas(context:TableContext):TableDefinition{
    var admin = context.user.rol === 'admin';
    return {
        name: 'expo_tablas',
        elementName: 'tablas para exportación',
        editable: admin,
        fields: [
            {name:"operativo"        , typeName:'text'                },
            {name:"expo_base"        , typeName:'text'                },
            {name:"expo_tabla"       , typeName:'text'                },
            {name:"tabla_datos"      , typeName:'text'                },
            {name:"nombre_destino"   , typeName:'text', title:'nombre de archivo resultante de la exportación' },
        ],
        primaryKey: ['operativo','expo_base','expo_tabla'],
        foreignKeys:[
            {references:'expo_bases', fields:['operativo', 'expo_base']},
            {references:'tabla_datos', fields:['operativo','tabla_datos']},
        ],
        detailTables: [
            { table: 'expo_variables', fields: ['expo_tabla', 'expo_base', 'operativo'], abr: 'T', label: 'tablas para exportación' }
        ]
    }
}

export {expo_tablas};