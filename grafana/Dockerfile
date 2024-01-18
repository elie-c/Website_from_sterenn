FROM grafana/grafana:9.3.2 

ENV GF_SERVER_SERVE_FROM_SUB_PATH=true

USER root

COPY ./dashboard.yml /etc/grafana/provisioning/dashboards/dashboard.yaml
COPY ./config.ini /etc/grafana/grafana.ini
