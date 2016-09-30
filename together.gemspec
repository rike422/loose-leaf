$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "together/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "together"
  s.version     = Together::VERSION

  s.authors     = ['Akira Takahashi']
  s.email       = ['rike422@gmail.com']
  s.homepage    = 'https://github.com/rike422/together'
  s.summary     = 'A Rails gem for real-time collaboration using ActionCable'
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]

  s.add_dependency "rails", "~> 5.0.0", ">= 5.0.0.1"

  s.add_dependency 'ot'
  s.add_development_dependency 'rspec-rails'
  s.add_development_dependency "sqlite3"
end
