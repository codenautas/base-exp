"use strict";
import {TableContext,TableDefinition} from "operativos"

function expo_variables_opciones(context:TableContext):TableDefinition{
    var admin = context.user.rol === 'admin';
    return {
        name: 'expo_variables_opciones',
        elementName: 'opción de variable',
        editable: admin,
        fields: [
            { name: "operativo"          , typeName: 'text'    }, 
            { name: "expo_base"        , typeName:'text'       },
            { name: "expo_tabla"         , typeName: 'text'    },
            { name: "variable"            , typeName: 'text'    },
            { name: "opcion"              , typeName: 'integer' },
            { name: "nombre"              , typeName: 'text'    },
            // { name: "expresion_condicion" , typeName: 'text'    },
            // { name: "expresion_valor"     , typeName: 'text'    },
            { name: "orden"               , typeName: 'integer' },
        ],
        primaryKey: ['operativo','expo_base','expo_tabla','variable', 'opcion'],
        foreignKeys:[
            {references:'expo_variables', fields:['operativo','expo_base','expo_tabla','variable']},
        ]
    }
}

export {expo_variables_opciones};