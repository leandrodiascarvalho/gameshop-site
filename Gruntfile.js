module.exports = function (grunt) {
  // Configuração do projeto
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    // Otimização de imagens
    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 3,
          progressive: true,
          interlaced: true,
        },
        files: [
          {
            expand: true,
            cwd: "src/assets/img",
            src: ["**/*.{png,jpg,gif}"],
            dest: "dist/assets/img",
          },
        ],
      },
    },

    // Minificação do CSS
    cssmin: {
      target: {
        files: [
          {
            expand: true,
            cwd: "dist/css",
            src: ["*.css", "!*.min.css"],
            dest: "dist/css/",
            ext: ".min.css",
          },
        ],
      },
    },

    // Minificação do JavaScript
    uglify: {
      options: {
        banner:
          '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n',
      },
      build: {
        files: [
          {
            expand: true,
            cwd: "dist/js",
            src: ["*.js", "!*.min.js"],
            dest: "dist/js",
            ext: ".min.js",
          },
        ],
      },
    },

    // Observador de arquivos
    watch: {
      images: {
        files: ["src/assets/img/**/*.{png,jpg,gif}"],
        tasks: ["imagemin"],
        options: {
          spawn: false,
        },
      },
      css: {
        files: ["dist/css/*.css", "!dist/css/*.min.css"],
        tasks: ["cssmin"],
        options: {
          spawn: false,
        },
      },
      js: {
        files: ["dist/js/*.js", "!dist/js/*.min.js"],
        tasks: ["uglify"],
        options: {
          spawn: false,
        },
      },
    },
  });

  // Carrega os plugins
  grunt.loadNpmTasks("grunt-contrib-imagemin");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");

  // Tarefa padrão: otimizações principais
  grunt.registerTask("default", ["imagemin", "cssmin", "uglify"]);

  // Tarefa de observação
  grunt.registerTask("dev", ["watch"]);
};
