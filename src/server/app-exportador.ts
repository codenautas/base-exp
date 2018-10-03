"use strict";

import * as operativos from "operativos";
import { procedures } from "./procedures-exportador";
import { expo_bases } from "./table-expo_bases";
import { expo_tablas } from "./table-expo_tablas";
import { expo_variables } from "./table-expo_variables";
import { expo_variables_opciones } from "./table-expo_variables_opciones";

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

        configStaticConfig(){
            super.configStaticConfig();
            this.setStaticConfig(`
          server:
            port: 3038
            base-url: /exportador
            session-store: memory
          db:
            motor: postgresql
            host: localhost
            database: exportador_db
            schema: exportador
            user: exportador_user
            search_path: 
            - exportador
          install:
            dump:
              db:
                owner: exportador_owner
              admin-can-create-tables: true
              enances: inline
              skip-content: true
              scripts:
                post-adapt: 
                - para-install.sql
                - ../node_modules/pg-triggers/lib/recreate-his.sql
                - ../node_modules/pg-triggers/lib/table-changes.sql
                - ../node_modules/pg-triggers/lib/function-changes-trg.sql
                - ../node_modules/pg-triggers/lib/enance.sql
          login:
            table: usuarios
            userFieldName: usuario
            passFieldName: md5clave
            rolFieldName: rol
            infoFieldList: [usuario, rol]
            activeClausule: activo
            plus:
              maxAge-5-sec: 5000    
              maxAge: 864000000
              maxAge-10-day: 864000000
              allowHttpLogin: true
              fileStore: false
              skipCheckAlreadyLoggedIn: true
              loginForm:
                formTitle: Base Exp
                usernameLabel: usuario
                passwordLabel: md5clave
                buttonLabel: entrar
                formImg: img/login-lock-icon.png
              chPassForm:
                usernameLabel: usuario
                oldPasswordLabel: clave anterior
                newPasswordLabel: nueva clave
                repPasswordLabel: repetir nueva clave
                buttonLabel: Cambiar
                formTitle: Cambio de clave
            messages:
              userOrPassFail: el nombre de usuario no existe o la clave no corresponde
              lockedFail: el usuario se encuentra bloqueado
              inactiveFail: es usuario está marcado como inactivo
          client-setup:
            cursors: true
            lang: es
            menu: true
            `);
        }

        getMenu():operativos.MenuDefinition{
            //TODO: es igual que en datos-ext llevarlo a operativos
            let myMenuPart: operativos.MenuInfo[] = [
                {
                    menuType: 'menu', name: 'Bases usuarios', menuContent: [
                        { menuType: 'table', name: 'expo_bases' },
                        { menuType: 'table', name: 'expo_tablas' },
                        { menuType: 'table', name: 'expo_variables' },
                        { menuType: 'table', name: 'expo_variables_opciones' }
                    ]
                }
            ];
            let menu = {menu: super.getMenu().menu.concat(myMenuPart)}
            return menu;
        }

        prepareGetTables(){
            //TODO: es igual que en datos-ext llevarlo a operativos
            super.prepareGetTables();
            this.getTableDefinition={
                ...this.getTableDefinition,
                expo_bases,
                expo_tablas,
                expo_variables,
                expo_variables_opciones
            }            
        }
    }
}

export var AppExportador = emergeAppExportador(operativos.emergeAppOperativos(operativos.AppBackend));
export type AppExportadorType = InstanceType<typeof AppExportador>;
