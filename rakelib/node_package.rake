# Licensed by https://github.com/shakacode/react_on_rails#license

require_relative 'task_helpers'
include LooseLeaf::TaskHelpers

namespace :node_package do
  task :build_client do
    sh 'npm run build'
  end
end

task node_package: 'node_package:build'
