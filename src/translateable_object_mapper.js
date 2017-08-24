(function(_) {
    'use strict';

    angular.module('seco.translateableObjectMapper', ['sparql', 'pascalprecht.translate'])

    .constant('_', _)
    .value('SECO_DEFAULT_LANG', 'en')

    .factory('translateableObjectMapperService', ['_', 'objectMapperService', 'TranslateableObject', 'SECO_DEFAULT_LANG', function(_, objectMapperService, TranslateableObject, SECO_DEFAULT_LANG) {
        function TranslateableObjectMapper() { }

        function reviseObject(obj, orig) {
            var clone = _.clone(obj);
            _.forOwn(clone, function(value, key) {
                if (_.isObject(value)) {
                    var subObj = {};
                    var prefix = key + '__';
                    _.forOwn(orig, function(v, k) {
                        if (_.startsWith(k, prefix)) {
                            subObj[k.slice(prefix.length)] = v;
                        }
                    });
                    obj[key] = angular.extend(new TranslateableObject(), obj[key]);
                    obj[key] = reviseObject(obj[key], subObj);
                } else {
                    obj.setLangAttr(key, orig);
                }
            });
            return obj;
        }

        function postProcess(objects) {
            objects = objectMapperService.postProcess.call(this, objects);
            _.forEach(objects, function(obj) {
                setProperties(obj);
            });
            return objects;
        }

        function setProperties(obj) {
            if (!obj.langAttrs) {
                return obj;
            }
            _.forEach(_.keys(obj), function(key) {
                if (_.includes(obj.langAttrs, key)) {
                    return Object.defineProperty(obj, key, { get: _.bind(obj.getLangAttr, obj, key, SECO_DEFAULT_LANG) });
                }
                _.forEach(_.castArray(obj[key]), function(val) {
                    if (_.isObject(val)) {
                        return setProperties(val);
                    }
                });
            });
        }


        var proto = Object.getPrototypeOf(objectMapperService);
        TranslateableObjectMapper.prototype = angular.extend({}, proto, TranslateableObjectMapper.prototype);
        TranslateableObjectMapper.prototype.objectClass = TranslateableObject;
        TranslateableObjectMapper.prototype.reviseObject = reviseObject;
        TranslateableObjectMapper.prototype.postProcess = postProcess;

        return new TranslateableObjectMapper();
    }])
    .factory('TranslateableObject', ['$translate', '_', function($translate, _) {
        function TranslateableObject() {
        }

        TranslateableObject.prototype.getLangAttr = getLangAttr;
        TranslateableObject.prototype.setLangAttr = setLangAttr;

        function getFirst(val) {
            if (_.isArray(val)) {
                return val[0];
            }
            return val;
        }

        TranslateableObject.prototype.getLabel = function() {
            return getFirst(this.label);
        };
        TranslateableObject.prototype.getDescription = function() {
            return getFirst(this.description);
        };
        TranslateableObject.prototype.getTypeLabel = function() {
            return getFirst(this.type);
        };

        return TranslateableObject;

        function getLangAttr(attr, fallBackLang) {
            return _.get(this, attr + '_trans_' + $translate.use()) ||
                _.get(this, attr + '_trans_' + fallBackLang) ||
                _.get(this, attr + '_origval');
        }

        function setLangAttr(attr, orig) {
            var val = orig[attr.replace('.', '__')];
            if (val) {
                var lang = val['xml:lang'];
                if (lang) {
                    _.set(this, attr + '_trans_' + lang, val.value);
                    _.set(this, attr + '_origval', val.value);
                    if (!this.langAttrs) {
                        this.langAttrs = [];
                    }
                    this.langAttrs.push(attr);
                }
            }
        }
    }]);
})(_); // eslint-disable-line no-undef
