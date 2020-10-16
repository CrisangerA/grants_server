import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "grants",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    opportunity_number: {
      type: "varchar"
    },
    opportunity_title: {
      type: "text"
    },
    agency: {
      type: "varchar"
    },
    opportunity_status: {
      type: "varchar"
    },
    posted_date: {
      type: "varchar"
    },
    close_date: {
      type: "varchar"
    },
    href: {
      type: "varchar"
    }
  }
});