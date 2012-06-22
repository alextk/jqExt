require 'rubygems'
gem 'rego-ruby-ext'
require "rego-ruby-ext"
gem 'rego-js-builder'
require "rego-js-builder"
gem 'rake-hooks'
require 'rake/hooks'

project = JsProjectBuilder.new(
  :name => 'jqExt',
  :description => 'jQuery extensions and native javascript extensions',
  :file_name => 'jquery.jqext.js',
  :js_files => %w{ base.js
                   core/object.js  core/is.js  core/enumerable.js  core/array.js  core/date.js  core/function.js  core/regexp.js  core/string.js core/event.js
                   utils/system-info.js
                   oop/observable.js  oop/inheritance.js
                   wrapped-set/event.js  wrapped-set/dimensions.js
                 }
)
JsProjectBuilder::Tasks.new(project)
