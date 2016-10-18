$LOAD_PATH.push File.expand_path('../lib', __FILE__)

# Maintain your gem's version:
require 'loose_leaf/version'

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = 'loose-leaf'
  s.version     = LooseLeaf::VERSION

  s.authors     = ['Akira Takahashi']
  s.email       = ['rike422@gmail.com']
  s.homepage    = 'https://github.com/rike422/loose-leaf'
  s.summary     = 'A Rails gem for real-time collaboration using ActionCable'
  s.license     = 'MIT'

  s.files = Dir['{app,config,db,lib}/**/*', 'MIT-LICENSE', 'Rakefile', 'README.md']

  s.add_dependency 'rails', '~> 5.0.0', '>= 5.0.0.1'

  s.add_dependency 'ot'
  s.add_development_dependency 'rspec'
  s.add_development_dependency 'rspec-rails'
  s.add_development_dependency 'rspec-expectations'
  s.add_development_dependency 'pry'
  s.add_development_dependency 'pry-byebug'
  s.add_development_dependency 'pry-stack_explorer'
  s.add_development_dependency 'pry-doc'
  s.add_development_dependency 'pry-state'
  s.add_development_dependency 'pry-toys'
  s.add_development_dependency 'pry-rescue'
  s.add_development_dependency 'simplecov'
  s.add_development_dependency 'coveralls'
  s.add_development_dependency 'codeclimate-test-reporter'
  s.add_development_dependency 'rubocop'
  s.add_development_dependency 'guard'
  s.add_development_dependency 'guard-rspec'
  s.add_development_dependency 'guard-rubocop'
  s.add_development_dependency 'gem-release'
end
