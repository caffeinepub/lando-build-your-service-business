import List "mo:core/List";

module {
  type OldActor = { emails : List.List<Text> };
  type NewActor = { var emails : List.List<Text> };

  public func run(old : OldActor) : NewActor {
    { var emails = old.emails };
  };
};
