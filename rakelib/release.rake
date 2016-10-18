# Licensed by https://github.com/shakacode/react_on_rails#license

require_relative 'task_helpers'
include LooseLeaf::TaskHelpers

desc("Releases both the gem and node package using the given version.
1st argument: The new version in 'patch, minor, major'. Pass no argument to
              automatically perform a patch version bump.

2nd argument: Perform a dry run by passing 'true' as a second argument.
Example: `rake release[minor,false]`")

task :publish, [:increment_type, :dry_run] do |_t, args|
  if uncommitted_changes?
    raise 'You have uncommitted code. Please commit or stash your changes before continuing'
  end

  is_dry_run = if args.dry_run.strip.empty?
                 true
               else
                 object_to_boolean(args.dry_run)
               end

  version = args.increment_version || 'patch'

  case version
  when 'patch'
  when 'minor'
  when 'major'
  else
    raise 'You need to specify the <increment_type>, "patch, minor, major"'
  end

  # See https://github.com/svenfuchs/gem-release
  sh_in_dir(gem_root, 'git pull --rebase')
  sh_in_dir(gem_root, "gem bump --no-commit --version #{version}")

  # Update dummy app's Gemfile.lock
  bundle_install_in(dummy_app_dir)

  # Stage changes so far
  sh_in_dir(gem_root, 'git add .')

  # Will bump the npm version, commit, tag the commit, push to repo, and release on npm
  release_it_command = '$(npm bin)/release-it --non-interactive --npm.publish'
  release_it_command << ' --dry-run --verbose' if is_dry_run
  release_it_command << " #{version}"
  sh_in_dir(gem_root, release_it_command)

  # Release the new gem version
  sh_in_dir(gem_root, 'gem release') unless is_dry_run
end
