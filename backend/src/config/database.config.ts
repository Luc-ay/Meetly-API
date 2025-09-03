import 'dotenv/config'
import path from 'path'
import { config } from './app.config'
import { DataSource } from 'typeorm'

export const getDatabaseConfig = () => {
  const isProduction = config.NODE_ENV === 'production'
  const databaseUrl = config.DATABASE_URL

  return new DataSource({
    type: 'postgres',
    url: databaseUrl,
    entities: [path.join(__dirname, '../database/entity/*{.ts,.js}')],
    migrations: [path.join(__dirname, '../database/migrations/*{.ts,.js}')],
    synchronize: !isProduction,
    logger: isProduction ? 'advanced-console' : 'simple-console',
    ssl: isProduction
      ? {
          rejectUnauthorized: true,
        }
      : {
          rejectUnauthorized: false,
        },
  })
}

export const AppDataSource = getDatabaseConfig()
