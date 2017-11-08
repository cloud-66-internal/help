<!-- usedin: [ _includes/_inlines/Deployment/common/building-a-manifest-file/building-a-manifest-file_processes-v1.md] -->

```
production:
  procfile_metadata:
    worker:
      stop_sequence: ttin, 120, term, 5, kill
    web:
      restart_signal: usr1
      web_server_stop_signals: usr1, 30, kill
    nsq:
      restart_on_deploy: false
```