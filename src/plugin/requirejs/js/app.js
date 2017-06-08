requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        app:'../app',
        jquery: 'jquery/jquery-1.11.2'//
    }
});

// Start the main app logic.
require(['jquery', 'app/common','app/b'],//app÷∏œÚ../app
    function   ($,common) {
        //jQuery, canvas and the app/sub module are all
        //loaded and can be used here now.
        $('#test').html(b.);
    }
);