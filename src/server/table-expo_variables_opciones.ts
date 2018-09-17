"use strict";
import {TableContext,TableDefinition} from "operativos"

function expo_variables_opciones(context:TableContext):TableDefinition{
    var admin = context.user.rol === 'admin';
    return {
        name: 'expo_variables_opciones',
        elementName: 'opción de variable',
        editable: admin,
        fields: [
            { name: "variable"            , typeName: 'text'    },
            { name: "opcion"              , typeName: 'integer' },
            { name: "nombre"              , typeName: 'text'    },
            // { name: "expresion_condicion" , typeName: 'text'    },
            // { name: "expresion_valor"     , typeName: 'text'    },
            { name: "orden"               , typeName: 'integer' },
        ],
        primaryKey: ['variable','opcion'],
        foreignKeys:[
            {references:'expo_variables', fields:['variable']},
        ]
    }
}

export {expo_variables_opciones};