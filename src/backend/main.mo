import List "mo:core/List";

actor {
  let emails = List.empty<Text>();

  public shared ({ caller }) func submitEmail(email : Text) : async () {
    emails.add(email);
  };

  public query ({ caller }) func getEmails() : async [Text] {
    emails.toArray();
  };
};
