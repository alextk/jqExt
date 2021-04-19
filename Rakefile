# encoding: utf-8

require 'rubygems'
require 'bundler'
begin
  Bundler.require(:default, :development)
rescue Bundler::BundlerError => e
  $stderr.puts e.message
  $stderr.puts "Run `bundle install` to install missing gems"
  exit e.status_code
end
require 'rake'
# require 'rego-js-builder'

project = JsProjectBuilder.new(
  :name => 'jqExt',
  :description => 'jQuery extensions and native javascript extensions',
  :file_name => 'jquery.jqext.js',
  :js_files => %w{ base.js
                   core/object.js  core/is.js  core/enumerable.js  core/array.js  core/strftime.js  core/date.js  core/math.js  core/regexp.js  core/string.js core/event.js
                   utils/system-info.js
                   oop/observable.js  oop/inheritance.js
                   wrapped-set/event.js  wrapped-set/dimensions.js
                 }
)
JsProjectBuilder::Tasks.new(project)
