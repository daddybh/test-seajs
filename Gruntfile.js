module.exports = function(grunt) {
    var transport = require('grunt-cmd-transport');
    var script = transport.script.init(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        transport :{
            ios: {
                options : {
                    paths :["src"],
                    parsers : {
                        '.js' : [script.jsParser]
                    }
                },
                files :[{
                    expand : true,
                    cwd: 'src',
                    src: '**/*.js',
                    dest: '.tmp/js'
                }]
            }
        },
        concat:{
            ios:{
                options : {
                    include: "all",
                    paths :[".tmp/js"]
                },
                files : [{
                            expand: true,
                            cwd: '.tmp/js',
                            src: ['**/*.js'],
                            dest: 'dist/js',
                            ext: '.js'
                        }]
                    /*{'.tmp/ios.js':['.tmp/js/app/router.js']*/
                }
        }
    });

    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');

    grunt.registerTask('tmpl', 'tmodjs', function() {
        var TmodJS = require('tmodjs');
        var fs = require('fs');
        var path = require('path');
        // 模板目录
        var basepath = './src/tmpl/';

        // 配置（更多请参考文档）
        var options = {
            output: './src/js/app/',
            charset: 'utf-8',
            minify: false,
            helpers: './src/tmpl/helpers.js',
            debug: false // 此字段不会保存在配置中
        };
        var tmod = new TmodJS("./src/tmpl/", options);
        var results = [];
        var files = fs.readdirSync("./src/tmpl/app");

       files.forEach(function (file) {
            var finalPath = path.resolve("./src/tmpl/app/", file);
            if(fs.lstatSync(finalPath).isFile()){
                results.push(finalPath);
            }
        });

        var details = fs.readdirSync("./src/tmpl/appDetails/");
        details.forEach(function (file) {
            var finalPath = path.resolve("./src/tmpl/appDetails/", file);
            if(file.indexOf("package.json")<0 && fs.lstatSync(finalPath).isFile()){
                results.push(finalPath);
            }
        });
        //files.concat(files);
        console.log(results);
        tmod.compile(results);

    });
}