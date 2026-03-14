import List "mo:core/List";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Migration "migration";

(with migration = Migration.run)
actor {
  var emails = List.empty<Text>();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Anyone can submit their email (including guests/anonymous)
  public shared ({ caller }) func submitEmail(email : Text) : async () {
    emails.add(email);
  };

  // Admin-only function to get all emails
  public query ({ caller }) func getEmails() : async [Text] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can fetch all emails");
    };
    emails.toArray();
  };
};
