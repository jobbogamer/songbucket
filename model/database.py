
from flask.ext.sqlalchemy import SQLAlchemy

##################################  Config  ###################################

db = SQLAlchemy()

###############################  Model Classes  ###############################



#################################  Retrieval  #################################



##################################  Storage  ##################################



##############################  Other Functions  ##############################

def create_tables():
    db.create_all()

def commit_changes():
    db.session.commit()
