module.exports = {
  plugins: [
    require('@tailwindcss/postcss')({
      // se precisares de passar configPath ou outras opções, é aqui
    }),
    require('autoprefixer'),
  ],
}