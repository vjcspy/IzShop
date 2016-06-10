angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider', 'MODULE_CONFIG',
            function ($stateProvider, $urlRouterProvider, MODULE_CONFIG) {
                $urlRouterProvider
                    .otherwise('/app/dashboard');
                $stateProvider
                    .state('shop_products', {
                        abstract: true,
                        url: '/app',
                        views: {
                            '': {
                                templateUrl: 'modules/themes/admin.default/assets/views/layout.html'
                            },
                            'aside': {
                                templateUrl: 'modules/themes/admin.default/assets/views/aside.html'
                            },
                            'content': {
                                templateUrl: 'modules/themes/admin.default/assets/views/content.html'
                            }
                        },
                        resolve: {
                            authenticate: function ($q, IzSentinel, $state) {
                                var defer = $q.defer();
                                IzSentinel.authenticate().then(function (isLogged) {
                                    if (!isLogged)
                                        return $state.go('access.signin');
                                    else
                                        return defer.resolve(true);
                                });
                                return defer.promise;
                            }
                        }
                    })
                    .state('shop_products.list', {
                        url: '/list',
                        template: "<div>List product</div>"
                    })
                ;


                function load(srcs, callback) {
                    return {
                        deps: ['$ocLazyLoad', '$q',
                            function ($ocLazyLoad, $q) {
                                var deferred = $q.defer();
                                var promise = false;
                                srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                                if (!promise) {
                                    promise = deferred.promise;
                                }
                                angular.forEach(srcs, function (src) {
                                    promise = promise.then(function () {
                                        var name;
                                        angular.forEach(MODULE_CONFIG, function (module) {
                                            if (module.name == src) {
                                                if (!module.module) {
                                                    name = module.files;
                                                } else {
                                                    name = module.name;
                                                }
                                            } else {
                                                name = src;
                                            }
                                        });
                                        return $ocLazyLoad.load(name);
                                    });
                                });
                                deferred.resolve();
                                return callback ? promise.then(function () {
                                    return callback();
                                }) : promise;
                            }]
                    }
                }
            }
        ]
    );
