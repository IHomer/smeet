export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The AWSDate scalar type represents a valid extended ISO 8601 Date string. In other words, this scalar type accepts date strings of the form YYYY-MM-DD. This scalar type can also accept time zone offsets. For example, 1970-01-01Z, 1970-01-01-07:00 and 1970-01-01+05:30 are all valid dates. The time zone offset must either be Z (representing the UTC time zone) or be in the format ±hh:mm:ss. The seconds field in the timezone offset will be considered valid even though it is not part of the ISO 8601 standard. */
  AWSDate: any;
  /** The AWSDateTime scalar type represents a valid extended ISO 8601 DateTime string. In other words, this scalar type accepts datetime strings of the form YYYY-MM-DDThh:mm:ss.sssZ. The field after the seconds field is a nanoseconds field. It can accept between 1 and 9 digits. The seconds and nanoseconds fields are optional (the seconds field must be specified if the nanoseconds field is to be used). The time zone offset is compulsory for this scalar. The time zone offset must either be Z (representing the UTC time zone) or be in the format ±hh:mm:ss. The seconds field in the timezone offset will be considered valid even though it is not part of the ISO 8601 standard. */
  AWSDateTime: any;
  /** The AWSEmail scalar type represents an Email address string that complies with RFC 822. For example, username@example.com is a valid Email address. */
  AWSEmail: any;
  /** The AWSIPAddress scalar type represents a valid IPv4 or IPv6 address string. */
  AWSIPAddress: any;
  /**
   * The AWSJSON scalar type represents a JSON string that complies with RFC 8259.
   *
   * Maps like {\"upvotes\": 10}, lists like [1,2,3], and scalar values like \"AWSJSON example string\", 1, and true are accepted as valid JSON. They will automatically be parsed and loaded in the resolver mapping templates as Maps, Lists, or Scalar values rather than as the literal input strings. Invalid JSON strings like {a: 1}, {'a': 1} and Unquoted string will throw GraphQL validation errors.
   */
  AWSJSON: any;
  /** The AWSPhone scalar type represents a valid Phone Number. Phone numbers are serialized and deserialized as Strings. Phone numbers provided may be whitespace delimited or hyphenated. The number can specify a country code at the beginning but this is not required. */
  AWSPhone: any;
  /**
   * The AWSTime scalar type represents a valid extended ISO 8601 Time string. In other words, this scalar type accepts time strings of the form hh:mm:ss.sss. The field after the seconds field is a nanoseconds field. It can accept between 1 and 9 digits. The seconds and nanoseconds fields are optional (the seconds field must be specified if the nanoseconds field is to be used). This scalar type can also accept time zone offsets.
   *
   * For example, 12:30Z, 12:30:24-07:00 and 12:30:24.500+05:30 are all valid time strings.
   *
   * The time zone offset must either be Z (representing the UTC time zone) or be in the format hh:mm:ss. The seconds field in the timezone offset will be considered valid even though it is not part of the ISO 8601 standard.
   */
  AWSTime: any;
  /** The AWSTimestamp scalar type represents the number of seconds that have elapsed since 1970-01-01T00:00Z. Timestamps are serialized and deserialized as numbers. Negative values are also accepted and these represent the number of seconds till 1970-01-01T00:00Z. */
  AWSTimestamp: any;
  /** The AWSURL scalar type represents a valid URL string. The URL may use any scheme and may also be a local URL (Ex: <http://localhost/>). URLs without schemes are considered invalid. URLs which contain double slashes are also considered invalid. */
  AWSURL: any;
};

export type Query = {
  __typename?: 'Query';
  listTest?: Maybe<Array<Maybe<Test>>>;
};

export type Test = {
  __typename?: 'Test';
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};
