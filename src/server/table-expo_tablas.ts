"use strict";
import {TableContext,TableDefinition} from "operativos"

function expo_tablas(context:TableContext):TableDefinition{
    var admin = context.user.rol === 'admin';
    return {
        name: 'expo_tablas',
        elementName: 'tablas para exportación',
        editable: admin,
        fields: [
            {name:"expo_base"        , typeName:'text'                },
            {name:"expo_tabla"       , typeName:'text'                },
            {name:"nombre_destino"   , typeName:'text', title:'nombre de archivo resultante de la exportación' },
            {name:"tabla_datos"      , typeName:'text'                },
            // {name:"operativo"     , typeName:'text'                }, // no va porque la base tiene el operativo
        ],
        primaryKey: ['expo_tabla','expo_base'],
        foreignKeys:[
            {references:'expo_bases', fields:['expo_base']},
            {references:'tabla_datos', fields:['tabla_datos']},
        ],
        detailTables: [
            { table: 'expo_variables', fields: ['expo_tabla'], abr: 'T', label: 'variables' }
        ]
    }
}

export {expo_tablas};