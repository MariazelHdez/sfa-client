import knex, { Knex } from "knex"
import camelcaseKeys from "camelcase-keys"
import { snakeCase } from "lodash"

import { DB_CONFIG } from "@/config"

import { NON_STANDARD_COLUMN_NAMES_TRANSFORMS } from "@/utils/db-wrap-identifier-helpers"

const db = knex({
  client: DB_CONFIG.client,
  connection: DB_CONFIG.connection,
  postProcessResponse: (result, queryContext) => {
    if (Array.isArray(result)) {
      // For SELECT queries
      return result.map((row) => camelcaseKeys(row, { deep: true }))
    } else {
      // for INSERT/UPDATE/DELETE queries
      return camelcaseKeys(result, { deep: true })
    }
  },
  wrapIdentifier: (value, origImpl, queryContext) => {
    const specialValue = NON_STANDARD_COLUMN_NAMES_TRANSFORMS[value]
    if (specialValue) {
      return origImpl(specialValue)
    }

    return origImpl(snakeCase(value))
  },
})

const dbWithSchema: Knex = new Proxy(db, {
  apply: (target, thisArg, argumentsList) => {
    return target(...argumentsList).withSchema(DB_CONFIG.defaultSchema)
  },
  get: (target, prop: keyof Knex) => {
    if (typeof target[prop] === "function") {
      if (prop === "withSchema") {
        return (schema: string) => target[prop](schema) // format taken from src/api/node_modules/knex/types/index.d.ts
      } else if (prop === "destroy") {
        return (callback: Function) => db.destroy(callback)
      } else {
        return (...args: any[]) => target[prop](...args).withSchema(DB_CONFIG.defaultSchema)
      }
    }
    return target[prop]
  },
})

export default dbWithSchema
