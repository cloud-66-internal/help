<!-- usedin: [ _legacy_docker/deployment/getting-started-with-manifest-files-v1.md, _maestro/Deployment/getting-started-with-manifest-files-v1.md, _node/deployment/getting-started-with-manifest-files-v1.md, _rails/deployment/getting-started-with-manifest-files-v1.md, _skycap/deployment/getting-started-with-manifest-files-v1.md] -->


### Is my yaml valid?

The manifest file is YAML formatted. You can check its validity at [YAML Lint](http://www.yamllint.com/) or with this command:
    
`$ ruby -e "require 'yaml'; YAML.load_file('.cloud66/manifest.yml')"`
    

If you'd like to use a _Rails/Rack_ stack, once your `manifest.yml` file is in your `.cloud66` folder and checked in, you can go ahead and build your stack.

If you'd like to use a _Docker_ stack, create it and use the _Advanced_ tab after your code has been analyzed to provide your manifest content.



