问题描述
========================

调用关系：

`b.js` => `c.js` => `b.js` => `a.js`

期望经过`grunt transport`过后, d.js的依赖项应该包含`c.js` `b.js` 和`a.js`

实际只能获取到两层的依赖

tranport 后的 d.js：
```
define("d", [ "c", "b" ], function(require, exports, module) {
    var c = require("c");
    exports.dd = "dd";
});
```


grunt配置如下:

```
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
```



## 问题解决 ##

经过同事帮助 此问题解决

问题在于我使用require的时候，基于src目录

实际上需要基于`当前文件`

因此d.js中require c.js必须写成
```
    define(function(require, exports, module){
        var b = require('./b');
        exports.cc = "cc";
    });
```

