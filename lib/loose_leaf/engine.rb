module LooseLeaf
  class Engine < ::Rails::Engine
    isolate_namespace LooseLeaf

    initializer 'collaborate.vendor_assets' do |app|
    end

    config.generators do |g|
      g.test_framework :rspec
      g.factory_girl suffix: 'factory'
      g.helper false
      g.stylesheets false
      g.javascripts false
    end
  end
end
