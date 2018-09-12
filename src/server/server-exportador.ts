"use strict";

import {emergeAppExportador} from "./app-exportador"
import {emergeAppOperativos, AppBackend} from "operativos"

var AppExportador = emergeAppExportador(emergeAppOperativos(AppBackend));

new AppExportador().start();