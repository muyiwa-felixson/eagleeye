
FROM couchbase
 
COPY configure.sh /opt/couchbase

# ENV MY_HOME "/couchbase"
# WORKDIR $MY_HOME
# RUN configure.sh
ENTRYPOINT ["sh", "/opt/couchbase/configure.sh"] 
CMD ["/opt/couchbase/configure.sh"]