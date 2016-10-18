# Licensed by https://github.com/shakacode/react_on_rails#license

module LooseLeaf
  module TaskHelpers
    # Returns the root folder of the react_on_rails gem
    def gem_root
      File.expand_path('../../.', __FILE__)
    end

    def dummy_app_dir
      File.join(gem_root, 'spec/dummy')
    end

    def uncommitted_changes?
      return false if ENV['COVERAGE']
      status = `git status --porcelain`
      return false if status.empty?
      true
    end

    # Executes a string or an array of strings in a shell in the given directory
    def sh_in_dir(dir, shell_commands)
      shell_commands = [shell_commands] if shell_commands.is_a?(String)
      shell_commands.each { |shell_command| sh %(cd #{dir} && #{shell_command.strip}) }
    end

    def bundle_install_in(dir)
      sh_in_dir(dir, 'bundle install --path vendor/bundle')
    end

    # Runs bundle exec using that directory's Gemfile
    def bundle_exec(dir: nil, args: nil, env_vars: '')
      sh_in_dir(dir, "#{env_vars} #{args}")
    end

    def object_to_boolean(value)
      [true, 'true', 'yes', 1, '1', 't'].include?(value.is_a?(String) ? value.downcase : value)
    end

    def symbolize_keys(hash)
      hash.each_with_object({}) do |(key, value), new_hash|
        new_key = key.is_a?(String) ? key.to_sym : key
        new_value = value.is_a?(Hash) ? symbolize_keys(value) : value
        new_hash[new_key] = new_value
      end
    end
  end
end
