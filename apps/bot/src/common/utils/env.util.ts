
export const getEnvFilePath = () => {
  const envFiles = {
    production: ['.env.production', '.env'],
    development: ['.env.development', '.env'],
    test: ['.env.test', '.env']
  }

  return envFiles[process.env.NODE_ENV || 'development'];
}

export const isProduction = () => process.env.NODE_ENV === 'production'
