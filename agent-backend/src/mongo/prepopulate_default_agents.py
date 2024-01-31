from bson import ObjectId
from pymongo import MongoClient

def add_agent(agent_dict:dict) -> None:
    '''
    Add an agent to the mongo database.
    '''
    cnxn = MongoClient()
    mongo_client = cnxn["test"]
    
    # Upload input_json to mongo
    mongo_client["agents"].insert_one(agent_dict)
    # Disconnect from mongo
    cnxn.close()


def reset_default_agents() -> None:
    '''
    Delete agents present and reset the mongo database with default agents.
    '''
    cnxn = MongoClient()
    mongo_client = cnxn["test"]

    # Get default credentials id
    default_credential = mongo_client["credentials"].find_one({"name": "OpenAI-agentcloud"})
    default_credential_id = str(default_credential["_id"])

    # Delete all existing agents
    mongo_client["agents"].delete_many({})

    # Get all org and team id combinations as a list of tuples (org_id, team_id)
    # 1 org can have multiple teams in teamIds
    # Extract the org id and team id from each org into strings
    org_team_ids = []
    for org in mongo_client["orgs"].find():
        org_id = str(org["_id"])
        for team_id in org["teamIds"]:
            org_team_ids.append((org_id, str(team_id)))
    
    # Iterate and print all org and team id seperated by a space
    for org_team_id in org_team_ids:
        org_id = org_team_id[0]
        team_id = org_team_id[1]

        user_proxy_dict = {
            "orgId" : ObjectId(org_id), 
            "teamId" : ObjectId(team_id),
            "name" : "userproxy",
            "type" : "UserProxyAgent",
            "codeExecutionConfig" : None,
            "systemMessage" : "A user proxy agent that executes code.",
            "humanInputMode" : "NEVER",
            "model" : "gpt-4",
            "credentialId" : ObjectId(default_credential_id),
            "toolIds" : [],
            "datasourceIds" : []
        }

        add_agent(agent_dict=user_proxy_dict)

        general_agent_dict = {
        "_id" : ObjectId("65b8297d1c6b30efe9d750a0"),
        "orgId" : ObjectId(org_id), 
        "teamId" : ObjectId(team_id),
        "name" : "GeneralAssistant",
        "type" : "AssistantAgent",
        "codeExecutionConfig" : None,
        "systemMessage" : "You are a general assistant.",
        "humanInputMode" : None,
        "model" : "gpt-4",
        "credentialId" : ObjectId("65b829521c6b30efe9d7509f"),
        "toolIds" : [],
        "datasourceIds" : []
        }   

        add_agent(agent_dict=general_agent_dict)

        