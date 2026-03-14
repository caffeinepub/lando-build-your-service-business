import List "mo:core/List";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";



actor {
  var emails = List.empty<Text>();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // First caller becomes admin if no admin has been assigned yet
  public shared ({ caller }) func claimFirstAdmin() : async Bool {
    if (caller.isAnonymous()) { return false };
    if (accessControlState.adminAssigned) { return false };
    accessControlState.userRoles.add(caller, #admin);
    accessControlState.adminAssigned := true;
    return true;
  };

  // Check if any admin has been assigned
  public query func hasAdmin() : async Bool {
    accessControlState.adminAssigned;
  };

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
