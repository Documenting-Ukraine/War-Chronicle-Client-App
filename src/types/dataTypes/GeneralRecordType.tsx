import { OblastRegion } from "./OblastRegionType";
type address = {
  oblast: keyof OblastRegion;
  city: OblastRegion[keyof OblastRegion];
  latitude?: string;
  longitude?: string;
};
type ArrayOneOrMore<T> = {
  0: T;
} & Array<T>;
type MediaLink = {
  local_url: string;
  media_type: string;
  third_party_url?: string;
  description?: string;
};
type Media = {
  images?: ArrayOneOrMore<MediaLink>;
  videos?: ArrayOneOrMore<MediaLink>;
  main_image?: MediaLink;
};
interface GeneralRecordType {
  _id: string;
  record_title: string;
  record_creation_date: Date | string;
  media?: Media;
  description: string;
  evidence: ArrayOneOrMore<{
    description: string;
    url: string;
  }>;
  additional_evidence?: {
    description: string;
    url: string;
  }[];
} 
type GeneralEventType = GeneralRecordType & {
  date_first_published: Date | string;
  //timeRecorded?
  date_event_occured: Date | string;
  address?: address;
};
export type {
  GeneralRecordType,
  GeneralEventType,
  ArrayOneOrMore,
  MediaLink,
  Media,
};
/*
{
  "bsonType": "object",
  "properties": {
    "date_first_published": { "bsonType": "date" },
    "date_event_occured": { "bsonType": "date" },
    "address": {
      "bsonType": "object",
      "properties": {
        "oblast": { "bsonType": "string" },
        "city": { "bsonType": "string" },
        "latitude": { "bsonType": "string" },
        "longitude": { "bsonType": "string" }
      },
      "required": ["oblast", "city"]
    },
    "_id": {"bsonType": "string"},
    "record_title": {"bsonType": "string"},
    "record_creation_date": {"bsonType": "date"},
    "media": {
        "bsonType": "object", 
        "properties": {
          "images": ArrayOneOrMore<MediaLink>;
          "videos": ArrayOneOrMore<MediaLink>;
          "main_image": MediaLink;
        }
    }
    Media},
  "description": {"bsonType": "string"},
  "evidence": {
    "bsonType": "array", 
    "minItems": 1, 
    "items":{
        "bsonType": "object",
        "properties": {
            "description":{"bsonType": "string"},
            "url": {"bsonType": "string"}
        },
        "required":["url"]
    }
  },
 "additional_evidence": {
    "bsonType": "array", 
    "minItems": 1, 
    "items":{
        "bsonType": "object",
        "properties": {
            "description":{"bsonType": "string"},
            "url": {"bsonType": "string"}
        },
        "required":["url"]
    }
  }

}
    "record_type": "War Crimes",
    "war_crime": { "bsonType": "string" },
    "civilian_casualties": { "bsonType": "double" }
  },
  }
  "required": [
    "record_type",
    "war_crime",
    "date_event_occured",
    "date_first_published"
  ]
}
*/