group :red_green_refactor, halt_on_fail: true do
  guard :rubocop, all_on_start: false, cli: ['--format', 'clang', '-D', '-a'] do
    watch(/.+\.rb$/)
    watch(/bin/)
    watch(%r{(?:.+/)?\.rubocop\.yml$}) { |m| File.dirname(m[0]) }
  end
  
  
  guard :rspec, cmd: "bin/rspec --color --format doc" do
    require "guard/rspec/dsl"
    dsl   = Guard::RSpec::Dsl.new(self)
    # Feel free to open issues for suggestions and improvements
    # RSpec files
    rspec = dsl.rspec
    watch(rspec.libs) { rspec.spec_dir }
    watch(rspec.spec_helper) { rspec.spec_dir }
    watch(rspec.spec_support) { rspec.spec_dir }
    watch(rspec.spec_files)
    # Ruby files
    ruby = dsl.ruby
    dsl.watch_spec_files_for(ruby.lib_files)
  end
end

