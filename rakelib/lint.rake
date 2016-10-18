# Licensed by https://github.com/shakacode/react_on_rails#license

require_relative 'task_helpers'
include LooseLeaf::TaskHelpers

namespace :lint do
  desc 'Run Rubocop as shell'
  task :rubocop do
    sh_in_dir(gem_root, 'bundle exec rubocop .')
  end

  desc 'Run ruby-lint as shell'
  task :ruby do
    puts 'See /ruby-lint.yml for what directories are included.'
    sh_in_dir(gem_root, 'bundle exec ruby-lint .')
  end

  desc 'Run eslint as shell'
  task :standardjs do
    sh_in_dir(gem_root, 'npm run standard')
  end

  desc 'Run flow from shell'
  task :flow do
    sh_in_dir(gem_root, 'npm run flow')
  end

  desc 'Run all eslint, jscs, flow, rubocop linters. Skip ruby-lint and scss'
  task lint: [:standardjs, :flow, :rubocop] do
    puts 'Completed all linting'
  end
end

desc 'Runs all linters. Run `rake -D lint` to see all available lint options'
task lint: ['lint:lint']
